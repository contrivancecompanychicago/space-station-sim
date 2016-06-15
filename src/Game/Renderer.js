import Layer from './Renderer/Layer';

import grid from './Renderer/grid';

export default class Renderer{
  constructor(state, container){
    //make canvas
    this.state = state;
    this.layer = new Layer(container);
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));

  }
  resize() {
    this.layer.resize(window.innerWidth, window.innerHeight);
    this.layer.drawDemo();

  }
  update(){
    grid(this.state, this.layer);
  }
}
