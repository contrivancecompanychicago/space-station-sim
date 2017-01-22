import {keys} from 'lodash';

import renderBlock from './block';

export default function renderGridTask(state, layer){
  keys(state.Task).forEach((t) => {
    let task = state.Task[t];
    layer.context.globalAlpha = 0.3;
    renderBlock(task.block, task.grid, state, layer);
    layer.context.globalAlpha = 1;
  });
}
