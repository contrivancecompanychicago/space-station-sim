
import engine from 'Game/engine';

import pathToBlock from '././pathToBlock';
export default function* pathToObject(char, obj){
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let objs = objectManager.getObjectsOfType(obj);
  if(objs.length > 0){
    let i = Math.floor(Math.random()*objs.length);
    yield *pathToBlock(char, objs[i].block);
  }

}
