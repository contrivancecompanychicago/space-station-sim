//@flow
import engine from 'Game/engine';
import actions from './index'

import type Character from 'Game/Type/Character'

import state from 'Game/state'

export default function* wander(char:Character):Generator<*,*,*>{
  // let gridManager = engine.getComponent('gridManager');
  let gridManager = state.grid
  let block = gridManager.randomNode();
  yield *actions.pathToBlock(char, block);
}
