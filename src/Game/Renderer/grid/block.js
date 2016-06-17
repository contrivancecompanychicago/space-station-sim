import {localToGlobal, blockToPoint} from 'Util';

export default function renderBlock(block, state, layer){
  const offset = localToGlobal(blockToPoint(block), state);
  layer.context.fillRect(offset.x, offset.y, blockWidth * state.View.scale, blockHeight * state.View.scale);
  // console.log(state);
}
