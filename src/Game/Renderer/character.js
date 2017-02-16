//@flow

// import {worldToScreen, blockToPoint} from 'Util';
import {keys} from 'lodash';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import CharData from 'Game/Data/Character';

// let i:any = require('../Data/Character/char1.png')

export default function renderCharacter(state:State, layer:Layer) {
  keys(state.Character).forEach((key) => {
    let char = state.Character[key];
    const o = char.position.screen

    let type = CharData.get(char.type);
    // FLOWHACK fix image flow
    let i = type.image;
    let w = 32*state.View.scale
    let h = 32*state.View.scale
    let x = o.x - w/2;
    let y = o.y - h/2;
    layer.context.drawImage(i, 0, 0, i.width, i.height, x, y, w, h)

    // layer.context.fillStyle = type.tint;
    // layer.context.beginPath();
    // layer.context.arc(o.x, o.y, 4*state.View.scale, 0, Math.PI * 2);
    // layer.context.fill();
  });
}
