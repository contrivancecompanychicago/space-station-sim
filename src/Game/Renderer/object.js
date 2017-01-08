import {keys} from 'lodash';
import {worldToScreen, pointToBlock, screenToWorld, blockToPoint, makeKey, parseKey } from 'Util';

import Point from 'Game/Point';
import Rect from 'Game/Rect';

import config from 'Game/config';
const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import Types from 'Game/Type/Object';

export default function renderObject(state, layer){
  Rect.screenRect().blocks.forEach((block) => { //for each block on screen
    let ob = state.Object[block.key];
    if(ob){
      renderBlock(block, ob, state, layer);
    }
  });
}
export function renderBlock(block, object, state, layer){

  let t = Types[object.type];
  let o = block.rect.renderParams;

  let i = t.image;
  layer.context.drawImage(i, 0, 0, i.width, i.height, o.x, o.y, o.w* t.width, o.h*t.height);
}
