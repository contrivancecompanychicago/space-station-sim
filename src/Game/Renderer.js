//@flow
import {keys} from 'lodash'

import Proposer from 'Game/Action/Proposer';

import Layer from './Renderer/Layer';

import grid from './Renderer/grid';
import character, {renderSingleCharacter} from './Renderer/character';
import item from './Renderer/item';
import object from './Renderer/object';

import info from './Renderer/grid/info';
import renderSelection from './Renderer/grid/selection';

import renderDebugLines from './Renderer/debugLines'
import renderObjectBlocks from './Renderer/object/blocks'
import renderCharacterHighlight from './Renderer/character/highlight'
import renderGridWeights from './Renderer/grid/weights'
import renderCharacterPath from './Renderer/character/path'

import renderBlock from './Renderer/grid/block';
import {renderBlockObject} from './Renderer/object'

import Point from 'Game/Point'
import Rect from 'Game/Rect'
import Block from 'Game/Block'
import makeKey from 'Util/makeKey'

const proposer = new Proposer();

import type {State} from 'Game/state'

export default class Renderer{
	state:State;
	layer:Layer;
	gridLayer:Layer;
	hack:number;
	cache:{objects:number, grids:string, view:string}
	constructor(state:State, container:HTMLElement){
		//make canvas
		this.state = state;
		this.layer = new Layer(container);
		this.gridLayer = new Layer(document.createElement('div'));
		this.resize();
		window.addEventListener('resize', this.resize.bind(this));
		this.hack = 0;
		this.cache = {objects:0, grids:"", view:""}
	}
	resize() {
		this.layer.resize(window.innerWidth, window.innerHeight);
		this.gridLayer.resize(window.innerWidth, window.innerHeight);
		this.layer.drawDemo();
	}
	renderGrid(){
		// if(this.cache.objects !== keys(this.state.object.state).length ||
		// 	this.cache.grids !== JSON.stringify(this.state.grid.state) ||
		// 	this.cache.view !== JSON.stringify(this.state.view.state.offset)+this.state.view.state.scale
		// ){
		// 	this.cache = {
		// 		objects: keys(this.state.object.state).length,
		// 		grids: JSON.stringify(this.state.grid.state),
		// 		view: JSON.stringify(this.state.view.state.offset)+this.state.view.state.scale
		// 	}
		// 	this.gridLayer.clear();
		// }
		this.gridLayer.clear();
		this.renderGridAndObjects(this.state, this.gridLayer);
		this.layer.drawImage(this.gridLayer.canvas, 0, 0);
	}
	update(){
		
		
		this.layer.clear();
		this.layer.setAlpha(1)

		this.renderGrid()

		// character(this.state, this.layer);
		item(this.state, this.layer);

		renderSelection(this.state, this.layer)
		info(this.state, this.layer)

		let proposal = proposer.propose(this.state);
		proposal.view = this.state.view;
		this.layer.setAlpha(0.5)
		grid(proposal, this.layer);
		object(proposal, this.layer);
		renderObjectBlocks(proposal, this.layer)

		renderCharacterHighlight(this.state, this.layer)

		if(this.state.ui.getSelectedCharacters().length>0){
			let char = this.state.ui.getSelectedCharacters()[0]
			renderCharacterPath(this.state, this.layer, char);
		}
		//debug
		// renderObjectBlocks(this.state, this.layer)
		// renderDebugLines(this.state, this.layer);
		// renderGridWeights(this.state, this.layer)
	}

	renderGridAndObjects(state:State, layer:Layer){
	
		let tl = Point.fromScreen(0,0).block
		let br = Point.fromScreen(window.innerWidth, window.innerHeight).block

		// renderWalls(state, layer);

		//reorder characters into y order
		let chars = state.character.getChars().sort((a,b) => {
			return a.position.y - b.position.y
		})

		// Rect.screenRect().blocks.forEach((block) => { //for each block on screen
		let sel = Rect.screenRect().blockRect();
		for(let y = sel.t; y <= sel.b; y++){
			for(let x = sel.l; x <= sel.r; x++){
				let block = new Block({x,y})
				let node = state.grid.getNode(block.x, block.y)
				if(node){
					renderBlock(block, node, state, layer);
					let ob = node.getObject()
					if(ob){
						//only render if I have selected the bottomright block;
						if(ob.getBottomRightBlock().is(block))
							renderBlockObject(block, ob, state, layer);
					}
				}
			}
			//paste characters over the top;
			let maxy = new Block({x:0, y: y}).center.y
			//while the next char in array is on this row
			while(chars.length>0 && chars[0].position.y <= maxy){
				let char = chars.shift();
				renderSingleCharacter(char, state, layer);
			}
		}
		// })
		// grid(state, layer);
		// object(state, layer);
	}
}
