//@flow
import config from 'Game/config';
import { keys, mapValues, assign } from 'lodash';
import { makeKey, parseKey } from 'Util/index';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import renderBlock from './grid/block';
// import renderInfo from './grid/info';
import renderSelection from './grid/selection';
import renderTask from './grid/task';
// import renderProposal from './grid/proposal';

import Point from 'Game/Point';
import Block from 'Game/Block';
import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

function renderGrid(state:State, layer:Layer){


  
  let tl = Point.fromScreen(0,0).block
  let br = Point.fromScreen(window.innerWidth, window.innerHeight).block

  // renderWalls(state, layer);

  for(let x = tl.x; x<=br.x; x++){
    for(let y = tl.y; y<=br.y; y++){
      let pos = new Block({x, y});
      let key = makeKey(x, y);
      if(state.grid.state[key]){
        renderBlock(pos, state.grid.state[key], state, layer);
        // let block = {x, y};
      }
    }
  }

  // renderSelection(state, layer);

  renderTask(state, layer);
}



export default renderGrid;
