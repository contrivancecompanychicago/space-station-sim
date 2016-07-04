import {keys, tail} from 'lodash';
const MAX = 60 ; //theoretical
//HACK kinda cus I wanted these to be pure, but I think this is a good exception
class FPS{
  constructor() {
    this.count = 0;
    this.fps = [];
    setInterval(() => {

      this.fps.push(this.count);
      this.count = 0;
      // console.log(this.fps);
      if(this.fps.length>100){
        this.fps.shift();
      }

    }, 1000);
  }
  render(layer){
    this.count++;
    let i = 0;
    for(let i = this.fps.length; i>=0; i--){

      let pc = this.fps[i]/MAX;
      layer.context.fillStyle = 'rgb('+Math.floor((1-pc)*255)+','+Math.floor(pc*255)+',0)';
      layer.context.fillRect(this.fps.length-i, 0, 1, this.fps[i]/2);
  }

    layer.context.fillStyle = "white";
    layer.context.fillText(this.fps[this.fps.length-1]+"FPS", 10, 10);
  }
}

let fps = new FPS();

export default function renderInfo(state, layer){
  let offset = 30;
  let lineHeight = 20;
  fps.render(layer);
  layer.context.fillStyle = "grey";
  layer.context.font = '14px verdana';
  layer.context.fillText(JSON.stringify(state.View), 10, offset+= lineHeight);
  layer.context.fillText("x "+state.View.offset.x+" y " + state.View.offset.y, 10, offset+= lineHeight);
  layer.context.fillText(keys(state.Grid).length+" grid objects", 10, offset+= lineHeight);
  layer.context.fillText(keys(state.Character).length+" character objects", 10, offset+= lineHeight);
  layer.context.fillText(keys(state.Task).length+" task objects", 10, offset+= lineHeight);
  layer.context.fillText(keys(state.Item).length+" item objects", 10, offset+= lineHeight);
}
