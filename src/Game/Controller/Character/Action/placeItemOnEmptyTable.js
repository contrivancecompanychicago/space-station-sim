//@flow
import engine from 'Game/engine';
import state from 'Game/state'

import type Character from 'Game/Type/Character'

import type Obj from 'Game/Type/Object'

import actions from './index'

import Ability from 'Game/Data/Object/Ability'
import type {AbilityType} from 'Game/Data/Object/Ability'
export default function* placeItemOnEmptyTable(char:Character, ability:AbilityType):Generator<*,*,*>{
  let objs = state.object.getObjectsWithAbility(ability);
  objs = objs.filter((obj:Obj) => {
    if(obj.character) return false;
    if(obj.item) return false;
    return true;
  })
  if(objs.length>0){
    let targetObject:Obj = objs[0];
    targetObject.setCharacter(char);
    yield *actions.pathToBlock(char, targetObject.getAccessBlock());
    yield *actions.placeItemOnBlock(char, targetObject.block)
    targetObject.removeCharacter();
    let items = char.getItems();
    if(items.length>0){
      let item = items[0]
      targetObject.addItem(item)
      char.removeItem(item)
    }
  }
}
