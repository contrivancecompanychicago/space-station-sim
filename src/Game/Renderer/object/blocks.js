//@flow

import { keys, values } from 'lodash';
import Point from 'Game/Point';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'
import type Obj from 'Game/Type/Object'



// highlights around blocks
// to tell if a block is buildable

export default function renderObjectBlocks(state:State, layer:Layer){
  // console.log(state);
  values(state.Object).forEach((obj:Obj) => {
    // console.log(obj);
    obj.getBlocks().forEach((block) => {
      let o = obj.block.add(block).rect.renderParams

      switch(block.type){
        case 'ACCESS':
          layer.strokeStyle("green")
          break;
        case 'BLOCK':
          layer.strokeStyle("yellow")
          break;
      }


      layer.lineWidth(4)
      layer.strokeRect(o.x, o.y, o.w, o.h);
    })
  })
}
