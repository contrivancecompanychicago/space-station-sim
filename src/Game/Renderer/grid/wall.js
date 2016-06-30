import {makeKey, screenToWorld, pointToBlock, blockToPoint, worldToScreen} from 'Util';



import renderBlock from './block';


// const Sides = {
//   bottom: {
//     x:0, y: 1,
//   }
//
// }

function isFilled(x, y, state){
  let key = makeKey(x, y);
  return state.Grid[key];
}

export default function renderWall(state, layer){

  let tl = pointToBlock(screenToWorld({x:0, y:0}, state));
  let br = pointToBlock(screenToWorld({x:window.innerWidth, y:window.innerHeight}, state));
  let sides = [
    {x:0, y:1},
    {x:0, y:-1}
  ];
  for(let x = tl.x; x<br.x; x++){
    for(let y = tl.y; y<br.y; y++){
      let block = {x, y};
      //EACH RENDERABLE BLOCK
      sides.forEach(side => {

        if(isFilled(x+side.x, y+side.y, state)){
          let blocktl = worldToScreen(blockToPoint(block), state);
          let blockbr = worldToScreen(blockToPoint({x: block.x+1, y: block.y+1}), state);
          let x = blocktl.x;
          let y = blocktl.y;
          let w = blockbr.x - blocktl.x;
          let h = blockbr.y - blocktl.y;
          if(side.y===1){
            h*=.5;
            y+= h;
          }else if(side.y === -1){
            h*=.5;
          }
          layer.context.strokeRect(x, y, w, h);
        }
      });
    }
  }

  renderBlock(tl, 'test', state, layer);
  renderBlock(br, 'test', state, layer);
}
