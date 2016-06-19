import {assign} from 'lodash';
import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

export default function renderSelection(state, layer){

  // layer.context.shadowBlur=10;
  // layer.context.shadowColor="blue";
  if(state.View.selection){
    assign(layer.context, config.view.selection);
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
