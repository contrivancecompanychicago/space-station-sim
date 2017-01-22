
import {worldToScreen, blockToPoint} from 'Util';

import {keys} from 'lodash';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'
export default function renderLines(state:State, layer:Layer){
  keys(state.Character).forEach((key) => {
    //debug
    let char = state.Character[key];

    if(char.item){
      const itemoffset = worldToScreen(char.item.position, state);
      const offset = worldToScreen(char.position, state);
      layer.context.beginPath();
      layer.context.moveTo(offset.x, offset.y);
      layer.context.lineTo(itemoffset.x, itemoffset.y);
      layer.context.lineWidth = 5;
      layer.context.strokeStyle = '#ff0000';
      layer.context.stroke();
    }
  });


  keys(state.Object).forEach((key) => {
    let obj = state.Object[key];
    if(obj.character){
      const offset = worldToScreen(obj.block.center, state);
      const charoffset = worldToScreen(obj.character.position, state);

      layer.context.beginPath();
      layer.context.moveTo(offset.x, offset.y);
      layer.context.lineTo(charoffset.x, charoffset.y);
      layer.context.lineWidth = 5;
      layer.context.strokeStyle = '#ffff00';
      layer.context.stroke();
    }

  });
  state.Order.forEach((order) => {
    if(order.worker){
      const offset = worldToScreen(order.customer.position, state);
      const charoffset = worldToScreen(order.worker.position, state);

      layer.context.beginPath();
      layer.context.moveTo(offset.x, offset.y);
      layer.context.lineTo(charoffset.x, charoffset.y);
      layer.context.lineWidth = 5;
      layer.context.strokeStyle = '#00ff00';
      layer.context.stroke();

    }

    if(order.item){
      const offset = worldToScreen(order.customer.position, state);
      const charoffset = worldToScreen(order.item.position, state);

      layer.context.beginPath();
      layer.context.moveTo(offset.x, offset.y);
      layer.context.lineTo(charoffset.x, charoffset.y);
      layer.context.lineWidth = 5;
      layer.context.strokeStyle = '#00ff00';
      layer.context.stroke();

    }
  })
}
