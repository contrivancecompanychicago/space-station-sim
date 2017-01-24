// @flow

import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import Types from 'Game/Data/Grid';

import type Grid from 'Game/Type/Grid'
import Point from 'Game/Point'
import type {State} from 'Game/state'

export default function renderBlock(pos:Point, block:Grid, state:State, layer:Object){

  layer.context.fillStyle = 'red';
  const offset = worldToScreen(blockToPoint(pos), state);
  let o = {x:offset.x, y:offset.y, w:blockWidth * state.View.scale, h:blockHeight * state.View.scale };

  if(Types[block.type]){
    let i = Types[block.type].image;
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
    // FLOWHACK
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
