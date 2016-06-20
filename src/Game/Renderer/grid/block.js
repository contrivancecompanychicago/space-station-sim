import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import Types from 'Game/Type/Grid';

export default function renderBlock(pos, block, state, layer){
  const offset = worldToScreen(blockToPoint(pos), state);
  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };
  layer.context.fillRect(o.x, o.y, o.w, o.h);
  // console.log(block);
  if(Types[block]){
    let i = Types[block].image;
    if(i)
      layer.context.drawImage(i, 0, 0, i.width, i.height, o.x, o.y, o.w, o.h);
  }


}
