
const blockWidth = 100;
const blockHeight = 100;

function grid(state, layer){
  layer.clear();


  renderBlock({x:0, y:0}, state, layer);
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
export default grid;
