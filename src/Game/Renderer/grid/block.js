import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import Types from 'Game/Data/Grid';

export default function renderBlock(pos, block, state, layer){
  layer.context.fillStyle = 'red';
  const offset = worldToScreen(blockToPoint(pos), state);
  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };

  // console.log(block);
  if(Types[block.type]){
    let i = Types[block.type].image;
    if(i){
      // layer.context.globalAlpha = 0.3;
      let fillInTheGaps = 1.01;
      layer.context.drawImage(i, 0, 0, i.width, i.height, o.x, o.y, o.w*fillInTheGaps, o.h*fillInTheGaps);
      // layer.context.globalAlpha = 1;
      // return;
    }
    let tint = Types[block.type].tint;
    if(tint){
      let a = layer.context.globalAlpha;
      layer.context.globalAlpha = a * 0.3;
      layer.context.fillStyle = tint;
      layer.context.fillRect(o.x, o.y, o.w, o.h);
      layer.context.globalAlpha  =  a;
    }

  }else{
    layer.context.fillRect(o.x, o.y, o.w, o.h);
  }



}
