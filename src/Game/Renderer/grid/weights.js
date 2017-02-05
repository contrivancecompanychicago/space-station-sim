//@flow
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import Point from 'Game/Point'
import Block from 'Game/Block'
import { blockToPoint, pointToBlock, screenToWorld, worldToScreen, makeKey, parseKey } from 'Util';

import * as engine from 'Game/engine'

export default function renderGridWeights(state:State, layer:Layer){
  let tl = pointToBlock(screenToWorld({x:0, y:0}, state));
  let br = pointToBlock(screenToWorld({x:window.innerWidth, y:window.innerHeight}, state));

  let gridManager = engine.getGridManager()
  // renderWalls(state, layer);

  for(let x = tl.x; x<br.x; x++){
    for(let y = tl.y; y<br.y; y++){
      let pos = new Block({x, y});
      let key = makeKey(x, y);
      if(state.Grid[key]){
        let cache = gridManager.pathCache
        if(cache){
          let weight = cache.grid[x-cache.minx][y-cache.miny]
          layer.context.fillText(weight, pos.center.screen.x, pos.center.screen.y)
          // console.log(weight);
          // let block = {x, y};
        }
      }
    }
  }
}
