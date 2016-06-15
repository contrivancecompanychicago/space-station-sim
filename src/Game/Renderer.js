
import Layer from './Renderer/Layer';
export default class Renderer{
  constructor(container){
    //make canvas
    this.layer = new Layer(container);
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));

  }
  resize() {
    this.layer.resize(window.innerWidth, window.innerHeight);
    this.layer.drawDemo();
  }
}
