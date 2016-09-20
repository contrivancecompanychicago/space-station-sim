import {keys} from 'lodash';
import {worldToScreen, pointToBlock, screenToWorld, blockToPoint, makeKey, parseKey } from 'Util';

import config from 'Game/config';
const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

export default function renderObject(state, layer){
  // key(state.Object).forEach((key) => {
  //   let block = parseKey(key);
  //
  //     let tl = pointToBlock(screenToWorld({x:0, y:0}, state));
  //     let br = pointToBlock(screenToWorld({x:window.innerWidth, y:window.innerHeight}, state));
  //
  // });

  let tl = pointToBlock(screenToWorld({x:0, y:0}, state));
  let br = pointToBlock(screenToWorld({x:window.innerWidth, y:window.innerHeight}, state));
  for(let x = tl.x; x<br.x; x++){
    for(let y = tl.y; y<br.y; y++){
      let pos = {x, y};
      let key = makeKey(x, y);
      if(state.Object[key]){
        renderBlock(pos, state.Object[key], state, layer);
        // let block = {x, y};
      }
    }
  }
}
export function renderBlock(pos, block, state, layer){
  const offset = worldToScreen(blockToPoint(pos), state);
  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };
  layer.context.fillRect(o.x, o.y, o.w, o.h);
}
