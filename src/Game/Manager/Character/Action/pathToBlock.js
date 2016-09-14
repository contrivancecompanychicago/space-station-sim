import engine from 'Game/engine';
import moveToBlock from './moveToBlock';

export default function* pathToBlock(char, block){
  let gridManager = engine.getComponent('gridManager');
  let current = char.position.block;
  let path = gridManager.getPath(current, block);
  while(path.length>0){
    let target = path.shift();
    yield *moveToBlock(char, target);
  }
}
