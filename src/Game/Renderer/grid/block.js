import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import Types from 'Game/Type/Grid';

export default function renderBlock(pos, block, state, layer){
  layer.context.fillStyle = 'red';
  const offset = worldToScreen(blockToPoint(pos), state);
  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };

  // console.log(block);
  if(Types[block]){
    let i = Types[block].image;
    if(i){
      // layer.context.globalAlpha = 0.3;
      let fillInTheGaps = 1.01;
      layer.context.drawImage(i, 0, 0, i.width, i.height, o.x, o.y, o.w*fillInTheGaps, o.h*fillInTheGaps);
      // layer.context.globalAlpha = 1;
      return;
    }

  }
  layer.context.fillRect(o.x, o.y, o.w, o.h);


}
