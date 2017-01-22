//@flow

import {worldToScreen, blockToPoint} from 'Util';
import {keys} from 'lodash';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import CharData from 'Game/Data/Character';

export default function renderCharacter(state:State, layer:Layer) {
  keys(state.Character).forEach((key) => {
    let char = state.Character[key];
    const offset = worldToScreen(char.position, state);
    let type = CharData[char.type];
    layer.context.fillStyle = type.tint;
    layer.context.beginPath();
    layer.context.arc(offset.x, offset.y, 10*state.View.scale, 0, Math.PI * 2);
    layer.context.fill();
  });
}
