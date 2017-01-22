//@flow

import engine from 'Game/engine'
import actions from './index'
import type Character from 'Game/Type/Character'
// import type CharacterManager from 'Game/Manager/Character';
import type GridManager from 'Game/Manager/Grid';

import Block from 'Game/Block'

export default function* wanderToAdjacentTile(char:Character):Generator<*,*,*>{
  let gridManager:GridManager = engine.getComponent('gridManager');
  let here = char.position.block;
  let adjacent = [
    {x:1, y:0},
    {x:-1, y:0},
    {x:0, y:1},
    {x:0, y:-1},
  ]
  let grids = adjacent.map(function (a){
    let pos = new Block({x:here.x+a.x, y: here.y+a.y})
    if(gridManager.getNode(pos.x, pos.y)){
      return pos
    }
  }).filter((g)=>{
    if(g)return true;
  })
  // console.log(grids);
  if(grids.length>0){
    let i = Math.floor(Math.random()*grids.length);
    let grid:Block = (grids[i]:any);
    // console.log(grid);
    yield *actions.pathToBlock(char, grid)
    yield *actions.idle(char, 2)
  }

}
