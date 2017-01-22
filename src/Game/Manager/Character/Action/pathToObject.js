//@flow
import engine from 'Game/engine';

import actions from './index'

import type Character from 'Game/Type/Character'
import type {ObjectType} from 'Game/Data/Object'


export default function* pathToObject(char:Character, obj:ObjectType):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let objs = objectManager.getObjectsOfType(obj);
  if(objs.length > 0){
    let i = Math.floor(Math.random()*objs.length);
    yield *actions.pathToBlock(char, objs[i].block);
  }

}
