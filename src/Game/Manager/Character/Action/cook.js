//@flow
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import idle from './idle';
import placeItemOnBlock from './placeItemOnBlock'
import placeItemOnEmptyTable from './placeItemOnEmptyTable'

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import Item from 'Game/Type/Item'
import type ItemManager from 'Game/Manager/Item';
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
  }
  yield *idle(char, 1);
  obj = yield *pathToObjectWithAbility(char, Ability.PREP_TABLE);
  if(obj){
    yield *placeItemOnBlock(char, obj.block)
  }
  yield *idle(char, 1);
  obj = yield *pathToObjectWithAbility(char, Ability.OVEN);
  if(obj){
    yield *placeItemOnBlock(char, obj.block)
  }
  yield *idle(char, 1);
  // obj = yield *pathToObjectWithAbility(char, Ability.SERVE_TABLE);
  // if(obj){
  //   yield *placeItemOnBlock(char, obj.block)
  // }
  // yield *idle(char, 1);
  yield *placeItemOnEmptyTable(char, Ability.SERVE_TABLE);


}
