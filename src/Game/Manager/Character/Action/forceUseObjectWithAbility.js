//@flow

import type Character from 'Game/Type/Character'
import type {AbilityType} from 'Game/Data/Object/Ability'
import type Obj from 'Game/Type/Object'
import actions from './index'

export default function* forceUseObjectWithAbility(char:Character, ability:AbilityType):Generator<*,Obj,*>{
  let obj = yield *actions.findObject((o:Obj) => {
    if(o.character) return false;
    if(o.item) return false;
    return o.hasAbility(ability)
  })
  obj.setCharacter(char);
  yield *actions.pathToBlock(char, obj.getAccessBlock());
  yield *actions.placeItemOnBlock(char, obj.block)
  obj.removeCharacter();
  return obj
}
