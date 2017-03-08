//@flow
import engine from 'Game/engine';
import actions from './index'

import type Character from 'Game/Type/Character'

import state from 'Game/state'

export default function* wander(char:Character):Generator<*,*,*>{
  let block = state.grid.randomNode();
  yield *actions.pathToBlock(char, block);
}
