//@flow

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import state from 'Game/state'

export default function renderCharacterHighlight(state:State, layer:Layer) {
  let char = state.character.getClosestCharacterToPoint(state.view.state.mousePosition, 32);
  if(char){
    const o = char.position.screen
    layer.drawCircle(o, 16*state.view.state.scale, 'blue')
  }
}
