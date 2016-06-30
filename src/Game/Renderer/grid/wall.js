import {makeKey, screenToWorld, pointToBlock} from 'Util';



import renderBlock from './block';

export default function renderWall(state, layer){

  let tl = pointToBlock(screenToWorld({x:0, y:0}, state));
  let br = pointToBlock(screenToWorld({x:window.innerWidth, y:window.innerHeight}, state));

  // for(let x = tl.x; x<br.x; x++){
  //   for(let y = tl.y; x<br.y; y++){
  //     let key = makeKey(x, y);
  //     if(state.Grid[key]){
  //         // renderBlock({x, y}, 'test', state, layer);
  //     }
  //   }
  // }

  renderBlock(tl, 'test', state, layer);
  renderBlock(br, 'test', state, layer);
}
