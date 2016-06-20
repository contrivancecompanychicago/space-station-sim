
import config from 'Game/config';
import { keys, mapValues, assign } from 'lodash';
import { blockToPoint, globalToLocal, localToGlobal, makeKey, parseKey } from 'Util';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import renderBlock from './grid/block';
import renderInfo from './grid/info';
import renderSelection from './grid/selection';


function renderGrid(state, layer){
  layer.clear();
  keys(state.Grid).forEach((key) => {
    let pos = parseKey(key);
    renderBlock(pos, state.Grid[key], state, layer);
  });

  renderSelection(state, layer);

  renderInfo(state, layer);
}



export default renderGrid;
