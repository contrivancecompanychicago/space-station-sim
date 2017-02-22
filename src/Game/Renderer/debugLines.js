

import {keys} from 'lodash';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'
export default function renderLines(state:State, layer:Layer){

  layer.lineWidth(1);

  layer.strokeStyle('#ff0000');
  state.character.getChars().forEach( char => {
    char.item.forEach((item) => {
      const itemoffset = item.position.screen;
      const offset = char.position.screen;
      layer.drawLine(offset, itemoffset)
    })
  });

  layer.strokeStyle('#ffff00');
  state.object.getObjects().forEach(obj => {
    if(obj.character){
      const offset = obj.block.center.screen;
      const charoffset = obj.character.position.screen;
      layer.drawLine(offset, charoffset)
    }
  });

  layer.strokeStyle('#00ff00');
  state.order.getOrders().forEach(order => {
    if(order.worker){
      const offset = order.customer.position.screen;
      const charoffset = order.worker.position.screen;
      layer.drawLine(offset, charoffset)
    }

    if(order.item){
      const offset = order.customer.position.screen;
      const charoffset = order.item.position.screen;
      layer.drawLine(offset, charoffset)
    }
  })
}
