//@flow
import engine from 'Game/engine';
import pathToBlock from './pathToBlock';

import type Character from 'Game/Type/Character'

export default function* wander(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let block = gridManager.randomNode();
  yield *pathToBlock(char, block);
}
