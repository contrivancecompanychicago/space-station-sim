import Layer from './Renderer/Layer';

import grid from './Renderer/grid';
import character from './Renderer/character';
import item from './Renderer/item';

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
    this.hack++;
    if(this.hack>= 4){
      this.hack = 0;
      grid(this.state, this.layer);
    }
    item(this.state, this.layer);
    character(this.state, this.layer);
  }
}
