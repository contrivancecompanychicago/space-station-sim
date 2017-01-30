//@flow

import { keys, values } from 'lodash';
import Point from 'Game/Point';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'
import type Obj from 'Game/Type/Object'


export default function renderObjectBlocks(state:State, layer:Layer){
  // console.log(state);
  values(state.Object).forEach((obj:Obj) => {
    // console.log(obj);
    obj.getBlocks().forEach((block) => {
      let o = obj.block.add(block).rect.renderParams

      layer.context.fillStyle = 'green';
      layer.context.strokeStyle = "green"
      layer.context.lineWidth = 4;
      layer.context.strokeRect(o.x, o.y, o.w, o.h);
    })
  })
}
