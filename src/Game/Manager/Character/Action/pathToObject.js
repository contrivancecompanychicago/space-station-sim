
import engine from 'Game/engine';

import pathToBlock from '././pathToBlock';
export default function* pathToObject(char, obj){
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let objs = objectManager.getObjectsOfType(obj);
  for(let i = 0; i< objs.length; i++){
      yield *pathToBlock(char, objs[i].block);
  }

}
