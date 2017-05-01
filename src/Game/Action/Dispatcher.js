// @flow
import state from 'Game/state'
import Point from 'Game/Point';
import Block from 'Game/Block';

import {extend, keys} from 'lodash'

import {Mode} from 'Game/Data/Mode';
import {Tasks} from 'Game/Data/Task';
import ObjectData from 'Game/Data/Object'

import {makeKey, parseKey} from 'Util/index';

import Character from 'Game/Type/Character';
import Grid from 'Game/Type/Grid';
import Item from 'Game/Type/Item';
import Objekt from 'Game/Type/Object';
import Task from 'Game/Type/Task';

import type {Selection} from 'Game/Type/Selection'
import type {ObjectState} from 'Game/Model/Object'

// import actions from 'Game/Controller/Character/Action/index'
import pathToBlock from 'Game/Controller/Character/Action/pathToBlock';

import Proposer from 'Game/Action/Proposer';
const proposer = new Proposer();

const LEFTMOUSE = 0;
const RIGHTMOUSE = 2

export class Dispatcher{

	userAction(selection:Selection){
		let sel = selection.rect.blockRect();
		switch(state.ui.state.mode){
			case Mode.SELECT:
				if(selection.button === LEFTMOUSE){
					//CHANGE SELECTION
					let mouse = state.view.getMousePoint();
					let char = state.character.getClosestCharacterToPoint(mouse, 32)
					if(char){
						state.ui.setSelected(char);
					}else{
						let obj = state.object.getObjectAtBlock(mouse.block);
						if(obj){
							state.ui.setSelected(obj);
						}else{
							//no obj or char
							state.ui.clearSelected();
						}
					}
				}
				if(selection.button === RIGHTMOUSE){
					
					//CACHE ALL THIS SHIT NOW
					// dont figure this out in render 
					// because game state is changing constantly
					let block = selection.end.block
					let obj = state.object.getObjectAtBlock(block);

					let items = state.item.getItemsAtBlock(block);
					// if(obj){
					// 	//override items;
					// 	items = obj.getItems();
					// }

					let characters = state.character.getCharactersAtBlock(block);
					// console.log(selection.end.screen);
					
					// if(obj){//show menu
						state.ui.dispatch({
							type:'SHOW_CONTEXT_MENU', 
							character: state.ui.getSelected()[0],
							block: block,
							object: obj,
							items: items,
							characters: characters,
							position: selection.end.screen
						});
					// }else {//walk to the place
					// 	state.ui.getSelectedCharacters().forEach(s => {
					// 		s.action = pathToBlock(s, selection.end.block)
					// 		// if(obj){
					// 		// 	if(obj.hasAbility('MAKE_COFFEE')){
					// 		// 		s.action = actions.useCoffeeAbility(s, obj)
					// 		// 	}
					// 		// }
					// 	})
					// }
					//TODO REFACTOR
				}
				break;
			case Mode.GRID:
				if(selection.button == LEFTMOUSE){
					state.grid.addNodes(selection.rect, new Grid({type:state.ui.state.grid, rotation:state.ui.state.rotation}));
				}else if(selection.button == RIGHTMOUSE){
					state.grid.removeNodes(selection.rect);
				}
				break;
			case Mode.OBJECT:
				if(selection.button === RIGHTMOUSE){
					//DELETE MODE
					let obj = state.object.getObjectAtBlock(selection.end.block);
					if(obj){
						state.object.deleteObject(obj)
					}
				}else if(selection.button == LEFTMOUSE){
					let proposal = proposer.propose(state);
					state.object.mergeState(proposal.object.state)
				}
				break;
			case Mode.ITEM:
				let item = new Item({
					position: new Point({x: selection.end.x, y: selection.end.y}),
					type:state.ui.state.item});
				state.item.addItem(item);
				break;
			case Mode.CHAR:
				selection.rect.blocks.forEach(block => {
					let pos = block.center
					state.character.addChar(new Character({position: pos, type: state.ui.state.character}));
				})
				break;
			// case Mode.TASK:
			// 	selection.rect.blocks.forEach(block => {
			// 		let task = new Task({block:block, grid:state.ui.state.grid, type: Tasks.BUILD})
			// 		state.task.addTask(task)
			// 	})
			// 	break;
		}
	}
}

export default new Dispatcher();