//@flow

import actions from './index'

import type Character from 'Game/Type/Character'
import type {ObjectType} from 'Game/Data/Object'
import state from 'Game/state'

export default function* pathToObject(char:Character, obj:ObjectType):Generator<*,*,*>{
  let gridManager = state.grid
  let objectManager = state.object
  let objs = objectManager.getObjectsOfType(obj);
  if(objs.length > 0){
    let i = Math.floor(Math.random()*objs.length);
    yield *actions.pathToBlock(char, objs[i].getAccessBlock());
  }

}
