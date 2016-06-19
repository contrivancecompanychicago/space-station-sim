import {assign} from 'lodash';
import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

export default function renderSelection(state, layer){

  layer.context.shadowBlur=10;
  layer.context.shadowColor="blue";
  if(state.View.selection){
    assign(layer.context, config.view.selection);
    let tl = worldToScreen(blockToPoint({
      x: state.View.selection.rect.l,
      y: state.View.selection.rect.t
    }), state);
    let br = worldToScreen(blockToPoint({
      x: (state.View.selection.rect.r + 1),
      y: (state.View.selection.rect.b + 1)
    }), state);
    layer.context.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

  }
    layer.context.shadowBlur=0;
}
