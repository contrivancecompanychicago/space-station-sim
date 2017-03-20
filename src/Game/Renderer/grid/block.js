// @flow

import config from 'Game/config';

const blockWidth = config.grid.width;
const blockHeight = config.grid.height;

import GridData from 'Game/Data/Grid';

import type Grid from 'Game/Type/Grid'
import Point from 'Game/Point'
import Block from 'Game/Block'
import type {State} from 'Game/state'

export default function renderBlock(block:Block, grid:Grid, state:State, layer:Object){


  let type = GridData.get(grid.type);
  let i = type.image;
  if(i.width *2 == i.height){
    //HACK trying new tile types
    let tl = block.add({x:0, y:-1}).point.screen;
    let br = block.add({x:1, y:1}).point.screen;
    let w = br.x - tl.x
    let h = br.y - tl.y
    layer.drawImage(i, 0, 0, i.width, i.height, tl.x, tl.y, w, h);
    let link = type.link
    if(link){
      //copypasta-ish
      let neighbour = state.grid.getNodeAtBlock( block.add({x:0, y:1}) )
      if(neighbour && neighbour.type == grid.type){
        layer.drawImage(link.below, 0, 0, i.width, i.height, tl.x, tl.y, w, h);
      }
      
      neighbour = state.grid.getNodeAtBlock( block.add({x:0, y:-1}) )
      if(neighbour && neighbour.type == grid.type){
        layer.drawImage(link.above, 0, 0, i.width, i.height, tl.x, tl.y, w, h);
      }

      neighbour = state.grid.getNodeAtBlock( block.add({x:1, y:0}) )
      if(neighbour && neighbour.type == grid.type){
        layer.drawImage(link.right, 0, 0, i.width, i.height, tl.x, tl.y, w, h);
      }
      
      neighbour = state.grid.getNodeAtBlock( block.add({x:-1, y:0}) )
      if(neighbour && neighbour.type == grid.type){
        layer.drawImage(link.left, 0, 0, i.width, i.height, tl.x, tl.y, w, h);
      }
      
    }
  }else{

    const offset = block.point.screen
    let o = {x:offset.x, y:offset.y, w:blockWidth * state.view.state.scale, h:blockHeight * state.view.state.scale };

    
    if(i){
      let center = {x: o.x+(o.w/2), y: o.y+ (o.h/2)}
      let rot:number = 90*grid.rotation*Math.PI/180
      layer.drawImageRotated(i, center.x, center.y, o.w, o.h, rot)
    }
  }


}
