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

  //FIND PREP TABLE
  obj = yield *findObject((o:Obj) => {
    if(o.character) return false;
    if(o.getData().abilities.indexOf(Ability.PREP_TABLE) > -1) return true
  })
  // obj = yield *pathToObjectWithAbility(char, Ability.PREP_TABLE);
  obj.character = char;
  yield *pathToBlock(char, obj.block);
  yield *placeItemOnBlock(char, obj.block)
  yield *idle(char, 1);
  obj.character = null;

  //FIND OVEN
  obj = yield *findObject((o:Obj) => {
    if(o.character) return false;
    if(o.getData().abilities.indexOf(Ability.OVEN) > -1) return true
  })
  obj.character = char;
  yield *pathToBlock(char, obj.block);
  yield *placeItemOnBlock(char, obj.block)
  yield *idle(char, 1);
  obj.character = null;
  // obj = yield *pathToObjectWithAbility(char, Ability.SERVE_TABLE);
  // if(obj){
  //   yield *placeItemOnBlock(char, obj.block)
  // }
  // yield *idle(char, 1);
  yield *placeItemOnEmptyTable(char, Ability.SERVE_TABLE);


}
