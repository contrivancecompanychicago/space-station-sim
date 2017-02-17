// @flow
import {assign} from 'lodash';
// import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import type {Selection} from 'Game/Type/Selection'
import Block from 'Game/Block'
import Point from 'Game/Point'

export default function renderSelection(state:State, layer:Layer){

  // layer.context.shadowBlur=10;
  // layer.context.shadowColor="blue";
  if(state.View.selection){
    // let sel:Selection = state.View.selection;
    // assign(layer.context, config.view.selection);
    layer.strokeStyle(config.view.selection.strokeStyle)
    layer.shadowColor(config.view.selection.shadowColor)
    layer.shadowBlur(config.view.selection.shadowBlur)
    // FLOWHACK selection is defined
    let r = state.View.selection.rect.blockRect();
    let tl = new Block({x: r.l, y: r.t}).point.screen
    let br = new Block({x: r.r+1, y: r.b+1}).point.screen
    layer.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
    layer.strokeStyle("green");
    layer.shadowColor("green");
    // FLOWHACK selection is defined
    r = state.View.selection.rect;
    tl = new Point(r.l, r.t).screen
    br = new Point(r.r+1, r.b+1).screen
    layer.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
  }
  layer.shadowBlur(0);
}
