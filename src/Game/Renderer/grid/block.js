// @flow

// import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import GridData from 'Game/Data/Grid';

import type Grid from 'Game/Type/Grid'
import Point from 'Game/Point'
import Block from 'Game/Block'
import type {State} from 'Game/state'

export default function renderBlock(pos:Block, block:Grid, state:State, layer:Object){

  const offset = pos.point.screen
  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };

  let type = GridData.get(block.type);
  
  let i = type.image;
  if(i){
    let center = {x: o.x+(o.w/2), y: o.y+ (o.h/2)}
    let rot:number = 90*block.rotation*Math.PI/180
    layer.drawImageRotated(i, center.x, center.y, o.w, o.h, rot)
  }

}
