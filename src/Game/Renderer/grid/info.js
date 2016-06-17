export default function renderInfo(state, layer){
  layer.context.fillStyle = "grey";
  layer.context.font = '14px verdana';
  layer.context.fillText(JSON.stringify(state.View), 10, 20);
}
