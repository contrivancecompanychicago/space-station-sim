// @flow
import engine from 'Game/engine';

import actions from './index'

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block'
import state from 'Game/state'

export default function* pathToBlock(char:Character, block:Block):Generator<*,*,*>{
  // let gridManager = engine.getComponent('gridManager');
  let gridManager = state.grid
  let current = char.position.block;
  let path = gridManager.getPath(current, block);
  // while(path.length>0){
  //   let target = path.shift();
  //   yield *actions.moveToBlockCenter(char, target);
  // }
  yield *actions.followPath(char, path);
}
