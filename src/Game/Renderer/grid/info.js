// @flow

import type Layer from 'Game/Renderer/Layer'
import type {State} from 'Game/state'

const MAX = 60 ; //theoretical
//HACK kinda cus I wanted these to be pure, but I think this is a good exception
class FPS{
  count:number;
  fps: Array<number>;
  constructor() {
    this.count = 0;
    this.fps = [];
    setInterval(() => {

      this.fps.push(this.count);
      this.count = 0;
      if(this.fps.length>100){
        this.fps.shift();
      }

    }, 1000);
  }
  render(layer:Layer){
    this.count++;
    let i = 0;
    for(let i = this.fps.length; i>=0; i--){

      let pc = this.fps[i]/MAX;
      layer.fillStyle('rgb('+Math.floor((1-pc)*255)+','+Math.floor(pc*255)+',0)');
      layer.fillRect(this.fps.length-i, 0, 1, this.fps[i]/2);
  }

    layer.fillStyle("white");
    layer.fillText(this.fps[this.fps.length-1]+"FPS", 10, 10);
  }
}

let fps = new FPS();



export default function renderInfo(state:State, layer:Layer){
  fps.render(layer);
}
