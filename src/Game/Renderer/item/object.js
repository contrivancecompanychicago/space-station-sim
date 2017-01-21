// @flow

import {worldToScreen, blockToPoint} from 'Util';

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer';
import type Item from 'Game/Type/Item'

export default function renderObject(object:Item, state:State, layer:Layer){

    // layer.context.fillStyle = 'green';

    const offset = worldToScreen(object.position, state);
    layer.context.fillStyle = 'blue';
    layer.context.beginPath();
    layer.context.arc(offset.x, offset.y, 6*state.View.scale, 0, Math.PI * 2);
    layer.context.fill();
}
