//@flow
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import moveToBlockCenter from './moveToBlockCenter'

import type {AbilityType} from 'Game/Data/Object/Ability'
import type Character from 'Game/Type/Character'

import type Obj from 'Game/Type/Object'

export default function* pathToObject(char:Character, ability:AbilityType):Generator<*,Obj|null,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let objs = objectManager.getObjectsWithAbility(ability);
  if(objs.length > 0){
    let i = Math.floor(Math.random()*objs.length);
    let obj = objs[i]
    yield *pathToBlock(char, obj.block);
    yield *moveToBlockCenter(char, obj.block);
    return obj;
  }
  return null;
}
