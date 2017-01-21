// @flow

import {worldToScreen, blockToPoint} from 'Util';

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer';
import type Item from 'Game/Type/Item'
import ItemData from 'Game/Data/Item';

export default function renderItem(item:Item, state:State, layer:Layer){

    // layer.context.fillStyle = 'green';
    let type = ItemData[item.type]
    const o = worldToScreen(item.position, state);
    // layer.context.fillStyle = 'blue';
    // layer.context.beginPath();
    // layer.context.arc(offset.x, offset.y, 6*state.View.scale, 0, Math.PI * 2);
    // layer.context.fill();
    let i = type.image;
    let w = 20*state.View.scale
    let h = 20*state.View.scale
    let x = o.x - w/2;
    let y = o.y - h/2;


    layer.context.drawImage(i, 0, 0, i.width, i.height, x, y, w, h)

}
