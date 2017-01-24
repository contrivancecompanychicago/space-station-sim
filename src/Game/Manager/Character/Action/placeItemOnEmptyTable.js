//@flow
import engine from 'Game/engine';

import type Character from 'Game/Type/Character'
import type ObjectManager from 'Game/Manager/Object'

import type Obj from 'Game/Type/Object'

import actions from './index'

import Ability from 'Game/Data/Object/Ability'
import type {AbilityType} from 'Game/Data/Object/Ability'
export default function* placeItemOnEmptyTable(char:Character, ability:AbilityType):Generator<*,*,*>{
  // let ability = Ability.SERVE_TABLE;
  let objectManager:ObjectManager = engine.getComponent('objectManager');
  let objs = objectManager.getObjectsWithAbility(ability);
  // console.log(objs);
  objs = objs.filter((obj:Obj) => {
    if(obj.character) return false;
    if(obj.item) return false;
    return true;
  })
  // console.log(objs);
  if(objs.length>0){
    let targetObject:Obj = objs[0];
    targetObject.character = char;
    yield *actions.pathToBlock(char, targetObject.block);
    yield *actions.placeItemOnBlock(char, targetObject.block)
    targetObject.character = null;
    if(char.item.length>0){
      let item = char.item[0]
      targetObject.item = item
      char.removeItem(item)

    }
  }
  // objs.forEach((obj) => {
  //   //find an empty one
  //   console.log(obj);
  //   if(obj.character)
  //
  // })

  //drop item
  // char.item = null;

}
