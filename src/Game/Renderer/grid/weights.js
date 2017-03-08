//@flow
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import Point from 'Game/Point'
import Block from 'Game/Block'
import { makeKey, parseKey } from 'Util/index';

import * as engine from 'Game/engine'

import state from 'Game/state'

export default function renderGridWeights(state:State, layer:Layer){
  let tl = Point.fromScreen(0,0).block
  let br = Point.fromScreen(window.innerWidth, window.innerHeight).block
  // let tl = pointToBlock(screenToWorld({x:0, y:0}, state));
  // let br = pointToBlock(screenToWorld({x:window.innerWidth, y:window.innerHeight}, state));

  // renderWalls(state, layer);

  for(let x = tl.x; x<br.x; x++){
    for(let y = tl.y; y<br.y; y++){
      let pos:Block = new Block({x, y});
      // let key = makeKey(x, y);
      if(state.grid.getNode(x, y)){
        let cache = state.grid.pathCache
        if(cache){
          let weight = cache.grid[x-cache.minx][y-cache.miny]
          layer.fillText(weight, pos.center.screen.x, pos.center.screen.y)
          // let block = {x, y};
        }
      }
    }
  }
}
