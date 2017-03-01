//@flow
import {keys} from 'lodash'

import Proposer from 'Game/Action/Proposer';

import Layer from './Renderer/Layer';

import grid from './Renderer/grid';
import character from './Renderer/character';
import item from './Renderer/item';
import object from './Renderer/object';

import info from './Renderer/grid/info';
import renderSelection from './Renderer/grid/selection';

import renderDebugLines from './Renderer/debugLines'
import renderObjectBlocks from './Renderer/object/blocks'
import renderCharacterHighlight from './Renderer/character/highlight'
import renderGridWeights from './Renderer/grid/weights'
import renderCharacterPath from './Renderer/character/path'

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
    if(this.cache.objects !== keys(this.state.object.state).length ||
      this.cache.grids !== JSON.stringify(this.state.grid.state) ||
      this.cache.view !== JSON.stringify(this.state.view.state.offset)+this.state.view.state.scale
    ){
      this.cache = {
        objects: keys(this.state.object.state).length,
        grids: JSON.stringify(this.state.grid.state),
        view: JSON.stringify(this.state.view.state.offset)+this.state.view.state.scale
      }
      this.gridLayer.clear();
      grid(this.state, this.gridLayer);
      object(this.state, this.gridLayer);
    }

    this.layer.drawImage(this.gridLayer.canvas, 0, 0);
  }
  update(){
    
    
    this.layer.clear();
    this.layer.setAlpha(1)

    this.renderGrid()

    character(this.state, this.layer);
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

    if(this.state.ui.state.selected.length>0){
      let char = this.state.ui.state.selected[0]
      renderCharacterPath(this.state, this.layer, char);
    }
    //debug
    // renderObjectBlocks(this.state, this.layer)
    // renderDebugLines(this.state, this.layer);
    // renderGridWeights(this.state, this.layer)
  }
}
