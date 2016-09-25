
import Proposer from 'Game/Action/Proposer';

import Layer from './Renderer/Layer';

import grid from './Renderer/grid';
import character from './Renderer/character';
import item from './Renderer/item';
import object from './Renderer/object';


const proposer = new Proposer();


export default class Renderer{
  constructor(state, container){
    //make canvas
    this.state = state;
    this.layer = new Layer(container);
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    this.hack = 0;
  }
  resize() {
    this.layer.resize(window.innerWidth, window.innerHeight);
    this.layer.drawDemo();
    // console.log(this.state);
  }
  update(){
    this.layer.clear();

    this.layer.context.globalAlpha = 1;
    // this.hack++;
    // if(this.hack>= 4){
    //   this.hack = 0;
    grid(this.state, this.layer);
    // }
    item(this.state, this.layer);
    character(this.state, this.layer);
    object(this.state, this.layer);
    if(this.state.View.selection){
      let proposal = proposer.propose(this.state);
      proposal.View = this.state.View;
      this.layer.context.globalAlpha = 0.5;
      grid(proposal, this.layer);

    }
  }
}
