//@flow
import engine from 'Game/engine';

import actions from './index'

import type {AbilityType} from 'Game/Data/Object/Ability'
import type Character from 'Game/Type/Character'

import type Obj from 'Game/Type/Object'

export default function* pathToObjectWithAbility(char:Character, ability:AbilityType):Generator<*,Obj|null,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let objs = objectManager.getObjectsWithAbility(ability)
    .filter((o)=>{if(!o.character) return true});
  if(objs.length > 0){
    let i = Math.floor(Math.random()*objs.length);
    let obj = objs[i]
    obj.character = char;
    yield *actions.pathToBlock(char, obj.block);
    obj.character = null;
    // yield *moveToBlockCenter(char, obj.block);
    return obj;
  }
  return null;
}
