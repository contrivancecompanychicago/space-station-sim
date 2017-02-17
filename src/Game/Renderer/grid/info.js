
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
      layer.fillStyle('rgb('+Math.floor((1-pc)*255)+','+Math.floor(pc*255)+',0)');
      layer.fillRect(this.fps.length-i, 0, 1, this.fps[i]/2);
  }

    layer.fillStyle("white");
    layer.fillText(this.fps[this.fps.length-1]+"FPS", 10, 10);
  }
}

let fps = new FPS();



export default function renderInfo(state, layer){
  // let offset = 30;
  // let lineHeight = 20;
  // let date = new Date('1 January 2000');
  // date.setHours(9);
  // date.setSeconds(state.Time.currentTime);
  // let time = date.getHours()+":"+date.getMinutes()+", "+
  //   date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  fps.render(layer);
  // layer.fillStyle = "grey";
  // layer.font = '14px verdana';
  // layer.fillText(JSON.stringify(state.View), 10, offset+= lineHeight);
  // layer.fillText("x "+state.View.offset.x+" y " + state.View.offset.y, 10, offset+= lineHeight);
  // layer.fillText(keys(state.Grid).length+" grid objects", 10, offset+= lineHeight);
  // layer.fillText(keys(state.Character).length+" character objects", 10, offset+= lineHeight);
  // layer.fillText(keys(state.Task).length+" task objects", 10, offset+= lineHeight);
  // layer.fillText(keys(state.Item).length+" item objects", 10, offset+= lineHeight);
  // layer.fillText(keys(state.Object).length+" object objects", 10, offset+= lineHeight);
  // layer.fillText(time, 10, offset+= lineHeight);
}
