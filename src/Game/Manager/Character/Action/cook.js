//@flow
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import idle from './idle';
import placeItemOnBlock from './placeItemOnBlock'
import placeItemOnEmptyTable from './placeItemOnEmptyTable'
import findObject from './findObject'
// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'
import type {AbilityType} from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import Item from 'Game/Type/Item'
import type ItemManager from 'Game/Manager/Item';
import type Obj from 'Game/Type/Object'
// import {ItemType} from 'Game/Data/Item'

// import

export default function* cook(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let itemManager:ItemManager = engine.getComponent('itemManager')
  let obj = yield *pathToObjectWithAbility(char, Ability.FRIDGE);
  if(obj){
    let item = new Item({position: obj.block.center, type:'TEST'})
    itemManager.addItem(item);
    char.item = item;
  }else{
    return;
  }
  yield *idle(char, 1);

  yield *forceUseObjectWithAbility(char, Ability.PREP_TABLE)
  yield *forceUseObjectWithAbility(char, Ability.OVEN)
  obj = yield *forceUseObjectWithAbility(char, Ability.SERVE_TABLE)
  obj.item = char.item;
  char.item = null;

  // yield *placeItemOnEmptyTable(char, Ability.SERVE_TABLE);

}

function* forceUseObjectWithAbility(char:Character, ability:AbilityType):Generator<*,Obj,*>{
  let obj = yield *findObject((o:Obj) => {
    if(o.character) return false;
    if(o.item) return false;
    return o.hasAbility(ability)
  })
  obj.character = char;
  yield *pathToBlock(char, obj.block);
  yield *placeItemOnBlock(char, obj.block)
  yield *idle(char, 1);
  obj.character = null;
  return obj
}
