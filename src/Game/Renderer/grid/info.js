import {keys, tail} from 'lodash';

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
  getStats(){

  }
  render(layer){
    this.count++;
    let i = 0;
    layer.context.fillStyle = "#6666ff";
    this.fps.forEach((second)=>{
      i++;
      layer.context.fillRect(i, 0, i+1, second/2);
    });

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
}
