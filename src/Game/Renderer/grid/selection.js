import {assign} from 'lodash';
import {localToGlobal, blockToPoint} from 'Util';
import config from 'Game/config';

export default function renderSelection(state, layer){

  layer.context.shadowBlur=10;
  layer.context.shadowColor="blue";
  if(state.View.selection){
    assign(layer.context, config.view.selection);
    let tl = localToGlobal(blockToPoint({
      x: state.View.selection.l,
      y: state.View.selection.t
    }), state);
    let br = localToGlobal(blockToPoint({
      x: (state.View.selection.r + 1),
      y: (state.View.selection.b + 1)
    }), state);
    layer.context.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

  }
    layer.context.shadowBlur=0;
}
