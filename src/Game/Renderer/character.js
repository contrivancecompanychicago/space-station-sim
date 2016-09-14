import {worldToScreen, blockToPoint} from 'Util';
import {keys} from 'lodash';

export default function renderCharacter(state, layer) {
  keys(state.Character).forEach((key) => {
    let char = state.Character[key];
    const offset = worldToScreen(char.position, state);
    layer.context.fillStyle = 'white';
    layer.context.beginPath();
    layer.context.arc(offset.x, offset.y, 10*state.View.scale, 0, Math.PI * 2);
    layer.context.fill();
  });
}
