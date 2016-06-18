import {localToGlobal, blockToPoint} from 'Util';
import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

export default function renderBlock(block, state, layer){
  const offset = localToGlobal(blockToPoint(block), state);
  layer.context.fillRect(offset.x, offset.y, blockWidth * state.View.scale, blockHeight * state.View.scale);
  // console.log(state);
}
