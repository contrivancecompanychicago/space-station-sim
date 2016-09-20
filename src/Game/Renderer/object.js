import {keys} from 'lodash';
import {worldToScreen, pointToBlock, screenToWorld, blockToPoint, makeKey, parseKey } from 'Util';

import Point from 'Game/Point';
import Rect from 'Game/Rect';

import config from 'Game/config';
const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

export default function renderObject(state, layer){
  Rect.screenRect().blocks.forEach((block) => { //for each block on screen
    let ob = state.Object[block.key];
    if(ob){
      renderBlock(block, ob, state, layer);
    }
  });
}
export function renderBlock(block, object, state, layer){

  const offset = block.point.screen;

  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };

  layer.context.fillStyle = 'blue';
  layer.context.fillRect(o.x, o.y, o.w, o.h);
}
