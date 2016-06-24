import {keys} from 'lodash';

export default function renderInfo(state, layer){
  layer.context.fillStyle = "grey";
  layer.context.font = '14px verdana';
  layer.context.fillText(JSON.stringify(state.View), 10, 20);
  layer.context.fillText(keys(state.Grid).length+" grid objects", 10, 40);
  layer.context.fillText(keys(state.Character).length+" character objects", 10, 60);
  layer.context.fillText(keys(state.Task).length+" task objects", 10, 80);
}
