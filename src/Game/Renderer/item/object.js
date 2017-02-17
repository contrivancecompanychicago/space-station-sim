// @flow



import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer';
import type Item from 'Game/Type/Item'
import ItemData from 'Game/Data/Item';

export default function renderItem(item:Item, state:State, layer:Layer){

    let type = ItemData.get(item.type)
    const o = item.position.screen;
    let i = type.image;
    let w = 16*state.View.scale
    let h = 16*state.View.scale
    let x = o.x - w/2;
    let y = o.y - h/2;


    layer.drawImage(i, 0, 0, i.width, i.height, x, y, w, h)

}
