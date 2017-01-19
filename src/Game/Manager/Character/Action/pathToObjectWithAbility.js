//@flow
import engine from 'Game/engine';

import pathToBlock from '././pathToBlock';

import type {AbilityType} from 'Game/Data/Object/Ability'
import type Character from 'Game/Type/Character'

export default function* pathToObject(char:Character, ability:AbilityType):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let objs = objectManager.getObjectsWithAbility(ability);
  if(objs.length > 0){
    let i = Math.floor(Math.random()*objs.length);
    yield *pathToBlock(char, objs[i].block);
  }

}
