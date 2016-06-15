
import config from 'Game/config';

import { keys } from 'lodash';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

//TODO: move to Util
function makeKey(x, y){
  return `${x}_${y}`;
}
function parseKey(key){
  let parts = key.split('_');
  return {x:parseInt(parts[0]), y:parseInt(parts[1])};
}

function grid(state, layer){
  layer.clear();

  // renderBlock({x:1, y:1}, state, layer);
  // log(state)
  keys(state.Grid).forEach((key) => {
    let pos = parseKey(key);
    renderBlock(pos, state, layer);
  });

  info(state, layer);
}

function renderBlock(block, state, layer){

  const offset = localToGlobal({
    x: block.x * blockWidth,
    y: block.y * blockHeight
  }, state);
  layer.context.fillRect(offset.x, offset.y, blockWidth * state.View.scale, blockHeight * state.View.scale);
  // console.log(state);
}


function globalToLocal(point, state){
  return {
    x: (point.x / state.View.scale) - state.View.offset.x,
    y: (point.y / state.View.scale) - state.View.offset.y
  };
}
function localToGlobal(point, state){
  return {
    x: (state.View.offset.x + (point.x)) * state.View.scale,
    y: (state.View.offset.y + (point.y)) * state.View.scale,
  };
}

function info(state, layer){
  layer.context.fillStyle = "grey";
  layer.context.font = '14px verdana';

  layer.context.fillText(JSON.stringify(state.View), 10, 20);
}


export default grid;
