
import engine from 'Game/engine';
import pathToBlock from './pathToBlock';

export default function* wander(char){
  let gridManager = engine.getComponent('gridManager');
  let block = gridManager.randomNode();
  yield *pathToBlock(char, block);
}
