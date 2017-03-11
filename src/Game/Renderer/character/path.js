// @flow

import type {State} from 'Game/state';
import type Layer from 'Game/Renderer/Layer';
import type Character from 'Game/Type/Character';

export default function renderCharacterPath(state:State, layer:Layer, char:Character){
    let path = char.getPath();
    let last = char.position.screen;
    path.forEach(b => {
        let here = b.center.screen;
        layer.lineWidth(4)
        layer.strokeStyle('#00ff00')
        layer.drawLine(last, here);
        last = here;
    })

}