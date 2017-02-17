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
    // layer.shadowBlur(5)
    layer.drawCircle(o, 16*state.View.scale, 'blue')
    // layer.shadowBlur(0)
  }
}
