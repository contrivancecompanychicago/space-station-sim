
import config from 'Game/config';
import { keys, mapValues, assign } from 'lodash';
import { blockToPoint, globalToLocal, localToGlobal, makeKey, parseKey } from 'Util';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

// import renderBlock from './grid/block';
// import renderInfo from './grid/info';
// import renderSelection from './grid/selection';


function renderGrid(state, layer){
  layer.clear();

  keys(state.Grid).forEach((key) => {
    let pos = parseKey(key);
    renderBlock(pos, state, layer);
  });

  renderSelection(state, layer);

  renderInfo(state, layer);
}



function renderBlock(block, state, layer){
  const offset = localToGlobal(blockToPoint(block), state);
  layer.context.fillRect(offset.x, offset.y, blockWidth * state.View.scale, blockHeight * state.View.scale);
  // console.log(state);
}

function renderSelection(state, layer){

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

function renderInfo(state, layer){
  layer.context.fillStyle = "grey";
  layer.context.font = '14px verdana';
  layer.context.fillText(JSON.stringify(state.View), 10, 20);
}


export default renderGrid;
