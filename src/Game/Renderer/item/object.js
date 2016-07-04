import {worldToScreen, blockToPoint} from 'Util';

export default function renderObject(object, state, layer){

    layer.context.fillStyle = 'green';

    const offset = worldToScreen(object, state);
    layer.context.fillStyle = 'blue';
    layer.context.beginPath();
    layer.context.arc(offset.x, offset.y, 10*state.View.scale, 0, Math.PI * 2);
    layer.context.fill();
}
