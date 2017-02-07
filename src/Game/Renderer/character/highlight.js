//@flow

// import {worldToScreen, blockToPoint} from 'Util';

import {getCharacterManager} from 'Game/engine'

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

export default function renderCharacterHighlight(state:State, layer:Layer) {
  let charManager = getCharacterManager();
  let char = charManager.getClosestCharacterToPoint(state.View.mousePosition, 32);
  if(char){
    const o = char.position.screen

    layer.context.strokeStyle = 'blue';
    layer.context.beginPath();
    layer.context.arc(o.x, o.y, 16*state.View.scale, 0, Math.PI * 2);
    layer.context.stroke();
  }
}
