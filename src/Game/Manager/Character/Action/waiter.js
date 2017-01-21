//@flow
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import pathToObject from './pathToObject'
import placeItemOnEmptyTable from './placeItemOnEmptyTable'
import idle from './idle';

import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import type ObjectManager from 'Game/Manager/Object'



export default function* waiter(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager:ObjectManager = engine.getComponent('objectManager');

  // let objs = objectManager.getObjectsWithItemType('TEST')
  let objs = objectManager.getObjects().filter((o)=>{
    if(o.character) return false
    if(o.getData().abilities.indexOf('DINE_TABLE')>-1) return false;
    if(o.item&&o.item.type === 'TEST') return true;
  })
  // console.log(objs);
  if(objs.length > 0){
    let obj = objs[0];
    yield *pathToBlock(char, obj.block);
    //pick up item
    char.item = obj.item
    obj.item = null;
    yield *placeItemOnEmptyTable(char, Ability.DINE_TABLE)

  }

  // yield *pathToObjectWithAbility(char, Ability.SERVE_TABLE);
  // yield *idle(char, 1);
  // yield *pathToObjectWithAbility(char, Ability.DINE_TABLE);
  // yield *idle(char, 1);

}
