//@flow
import engine from 'Game/engine';

import actions from './index'

import type {AbilityType} from 'Game/Data/Object/Ability'
import type Character from 'Game/Type/Character'

import type Obj from 'Game/Type/Object'

import state from 'Game/state'

export default function* pathToObjectWithAbility(char:Character, ability:AbilityType):Generator<*,Obj|null,*>{
  let objs = state.object.getObjectsWithAbility(ability)
    .filter((o)=>{if(!o.getCharacter()) return true});
  if(objs.length > 0){
    let i = Math.floor(Math.random()*objs.length);
    let obj = objs[i]
    obj.setCharacter(char);
    yield *actions.pathToBlock(char, obj.getAccessBlock());
    obj.removeCharacter();
    return obj;
  }
  return null;
}
