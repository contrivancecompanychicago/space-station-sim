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

  layer.context.fillStyle = 'red';
  // const offset = worldToScreen(blockToPoint(pos), state);
  
  const offset = pos.point.screen
  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };

  let type = GridData.get(block.type);
  
  let i = type.image;
  if(i){
    // layer.context.globalAlpha = 0.3;
    let center = {x: o.x+(o.w/2), y: o.y+ (o.h/2)}
    let rot:number = 90*block.rotation*Math.PI/180
    layer.context.translate(center.x, center.y)
    layer.context.rotate(rot);

    layer.context.drawImage(i, 0, 0, i.width, i.height, -o.w/2, -o.h/2, o.w, o.h);


    layer.context.rotate(-rot);
    layer.context.translate(-center.x, -center.y)
    // layer.context.globalAlpha = 1;
    // return;
  }
  //fuck tint off
  // let tint = type.tint;
  // if(tint){
  //   let a = layer.context.globalAlpha;
  //   layer.context.globalAlpha = a * 0.3;
  //   layer.context.fillStyle = tint;
  //   layer.context.fillRect(o.x, o.y, o.w, o.h);
  //   layer.context.globalAlpha  =  a;
  // }

  // }else{
  //   layer.context.fillRect(o.x, o.y, o.w, o.h);
  // }



}
