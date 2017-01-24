
import {worldToScreen, blockToPoint} from 'Util';

import {keys} from 'lodash';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'
export default function renderLines(state:State, layer:Layer){

  layer.context.lineWidth = 1;

  layer.context.strokeStyle = '#ff0000';
  keys(state.Character).forEach((key) => {
    let char = state.Character[key];
    char.item.forEach((item) => {
      const itemoffset = worldToScreen(item.position, state);
      const offset = worldToScreen(char.position, state);
      layer.drawLine(offset, itemoffset)
    })
  });

  layer.context.strokeStyle = '#ffff00';
  keys(state.Object).forEach((key) => {
    let obj = state.Object[key];
    if(obj.character){
      const offset = worldToScreen(obj.block.center, state);
      const charoffset = worldToScreen(obj.character.position, state);
      layer.drawLine(offset, charoffset)
    }
  });

  layer.context.strokeStyle = '#00ff00';
  state.Order.forEach((order) => {
    if(order.worker){
      const offset = worldToScreen(order.customer.position, state);
      const charoffset = worldToScreen(order.worker.position, state);
      layer.drawLine(offset, charoffset)
    }

    if(order.item){
      const offset = worldToScreen(order.customer.position, state);
      const charoffset = worldToScreen(order.item.position, state);
      layer.drawLine(offset, charoffset)
    }
  })
}
