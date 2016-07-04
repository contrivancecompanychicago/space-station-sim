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
    {x:0, y:-1},
    {x:1, y:0},
    {x:-1, y:0},
    {x:1, y:1, corner:true},
    {x:1, y:-1, corner:true},
    {x:-1, y:1, corner:true},
    {x:-1, y:-1, corner:true}
  ];
  for(let x = tl.x; x<br.x; x++){
    for(let y = tl.y; y<br.y; y++){
      let block = {x, y};
      //EACH RENDERABLE BLOCK
      let rendered = {up:false, down:false, left:false, right:false};
      if(isFilled(x, y, state)){
        //do nothing
      }else{
        // if(Math.random()<0.0001)
        //   console.log('side');


        sides.forEach(side => {
          block = block;
          let check = {x:x+side.x, y:y+side.y};
          if(isFilled(check.x, check.y, state)){
            let blocktl = worldToScreen(blockToPoint(block), state);
            let blockbr = worldToScreen(blockToPoint({x: block.x+1, y: block.y+1}), state);
            let x = blocktl.x;
            let y = blocktl.y;
            let w = blockbr.x - blocktl.x;
            let h = blockbr.y - blocktl.y;
            let size = .4;
            if(side.y===1){
              // h*=.5;
              if(rendered.up) return;
              if(!side.corner) rendered.up = true;
              y+= h;
              h *= -size;
            }else if(side.y === -1){
              if(rendered.down) return;
              if(!side.corner) rendered.down = true;
              h*=size;
            }
            if(side.x===1){
              if(rendered.right) return;
              if(!side.corner) rendered.right = true;
              x+= w;
              w*=-size;
            }else if(side.x === -1){
              if(rendered.left) return;
              if(!side.corner) rendered.left = true;
              w*=size;
            }
            layer.context.fillStyle = 'grey';
            layer.context.strokeStyle = 'green';
            // if(side.corner ){//corner
            //   layer.context.strokeRect(x, y, w, h);
            //   // layer.context.fillRect(x, y, w, h);
            //   // layer.context.beginPath();
            //   // layer.context.arc(x, y, w, 0, Math.PI/2);
            //   // layer.context.fill();
            // }else{
            layer.context.fillRect(x, y, w, h);
            // }
          }
        });
      }
    }
  }

  // renderBlock(tl, 'test', state, layer);
  // renderBlock(br, 'test', state, layer);
}
