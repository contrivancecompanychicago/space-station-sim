// @flow
import {assign} from 'lodash';
import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import type {Selection} from 'Game/Type/Selection'

export default function renderSelection(state:State, layer:Layer){

  // layer.context.shadowBlur=10;
  // layer.context.shadowColor="blue";
  if(state.View.selection){
    // let sel:Selection = state.View.selection;
    assign(layer.context, config.view.selection);
    // FLOWHACK selection is defined
    let r = state.View.selection.rect.blockRect();
    let tl = worldToScreen(blockToPoint({
      x: r.l,
      y: r.t
    }), state);
    let br = worldToScreen(blockToPoint({
      x: (r.r + 1),
      y: (r.b + 1)
    }), state);
    layer.context.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

    layer.context.strokeStyle="green";
    layer.context.shadowColor="green";
    // FLOWHACK selection is defined
    r = state.View.selection.rect;
    tl = worldToScreen(({
      x: r.l,
      y: r.t
    }), state);
    br = worldToScreen(({
      x: (r.r + 1),
      y: (r.b + 1)
    }), state);
    layer.context.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);



  }
    layer.context.shadowBlur=0;
}
