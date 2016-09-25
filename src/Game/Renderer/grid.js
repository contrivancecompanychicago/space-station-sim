
import config from 'Game/config';
import { keys, mapValues, assign } from 'lodash';
import { blockToPoint, pointToBlock, screenToWorld, worldToScreen, makeKey, parseKey } from 'Util';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import renderBlock from './grid/block';
import renderInfo from './grid/info';
import renderSelection from './grid/selection';
import renderTask from './grid/task';
import renderWalls from './grid/wall';
// import renderProposal from './grid/proposal';


function renderGrid(state, layer){


  let tl = pointToBlock(screenToWorld({x:0, y:0}, state));
  let br = pointToBlock(screenToWorld({x:window.innerWidth, y:window.innerHeight}, state));

  renderWalls(state, layer);

  // keys(state.Grid).forEach((key) => {
  //   let pos = parseKey(key);
  //   if(pos.x>tl.x && pos.x < br.x){
  //     if(pos.y>tl.y && pos.y < br.y){ //cutoff
  //     renderBlock(pos, state.Grid[key], state, layer);
  //     }
  //   }
  //
  // });

  for(let x = tl.x; x<br.x; x++){
    for(let y = tl.y; y<br.y; y++){
      let pos = {x, y};
      let key = makeKey(x, y);
      if(state.Grid[key]){
        renderBlock(pos, state.Grid[key], state, layer);
        // let block = {x, y};
      }
    }
  }




  renderSelection(state, layer);

  renderTask(state, layer);
  // renderProposal(state, layer);

  renderInfo(state, layer);
}



export default renderGrid;
