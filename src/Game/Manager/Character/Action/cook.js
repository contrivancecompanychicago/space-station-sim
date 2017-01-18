
import engine from 'Game/engine';

import pathToBlock from '././pathToBlock';
import pathToObject from '././pathToObject';

import {Obj} from 'Game/Data/Object';

export default function* cook(char){
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  // let objs = objectManager.getObjectsOfType(Obj.FRIDGE);
  // for(let i = 0; i< objs.length; i++){
  //     yield *pathToBlock(char, objs[i].block);
  // }
  yield *pathToObject(char, Obj.FRIDGE);
  

}
