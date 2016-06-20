import {worldToScreen, blockToPoint} from 'Util';
import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import Types from 'Game/Type/Grid';

export default function renderBlock(pos, block, state, layer){
  const offset = worldToScreen(blockToPoint(pos), state);
  layer.context.fillRect(offset.x, offset.y, blockWidth * state.View.scale, blockHeight * state.View.scale);
  // console.log(block);
  let image = Types.BASIC.image;
  layer.context.drawImage(image,
    0, 0,
    image.width, image.height,
    offset.x, offset.y,
    blockWidth * state.View.scale, blockHeight * state.View.scale);

}
