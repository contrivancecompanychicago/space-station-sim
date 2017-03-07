//@flow

import {keys} from 'lodash';
import { makeKey, parseKey } from 'Util/index';

import Point from 'Game/Point';
import Rect from 'Game/Rect';
import type Block from 'Game/Block';

import config from 'Game/config';
const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import Types from 'Game/Data/Object';

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'
import type Obj from 'Game/Type/Object'

export default function renderObject(state:State, layer:Layer){
  Rect.screenRect().blocks.forEach((block) => { //for each block on screen
    let ob = state.object.state[block.key];
    if(ob){
      renderBlockObject(block, ob, state, layer);
    }
  });
}
export function renderBlockObject(block:Block, object:Obj, state:State, layer:Layer){

  let t = Types.get(object.type);
  // let o = block.rect.renderParams;
  let o = object.block.rect.renderParams

  let i = t.image;
  let center = {x: o.x+(o.w/2), y: o.y+ (o.h/2)}
  let rot:number = 90*object.rotation*Math.PI/180
  layer.translate(center.x, center.y)
  layer.rotate(rot);
  layer.drawImage(i, 0, 0, i.width, i.height, -o.w/2, -o.h/2, o.w* t.width, o.h*t.height);
  layer.rotate(-rot);
  layer.translate(-center.x, -center.y)
}
