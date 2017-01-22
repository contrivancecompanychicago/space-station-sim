//@flow
import engine from 'Game/engine';

import actions from './index'

// import pathToBlock from './pathToBlock';
// import pathToObjectWithAbility from './pathToObjectWithAbility';
// import idle from './idle';
// import wander from './wander';
// import placeItemOnBlock from './placeItemOnBlock'
// import placeItemOnEmptyTable from './placeItemOnEmptyTable'
// import findObject from './findObject'
// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'
import type {AbilityType} from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import Item from 'Game/Type/Item'
import type ItemManager from 'Game/Manager/Item';
import type OrderManager from 'Game/Manager/Order';
import type Obj from 'Game/Type/Object'
// import {ItemType} from 'Game/Data/Item'

// import

export default function* cook(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let itemManager:ItemManager = engine.getComponent('itemManager')
  let orderManager:OrderManager = engine.getComponent('orderManager')
  // let obj = yield *pathToObjectWithAbility(char, Ability.FRIDGE);
  // if(obj){
  //   let item = new Item({position: obj.block.center, type:'TEST'})
  //   itemManager.addItem(item);
  //   char.item = item;
  // }else{
  //   return;
  // }
  // yield *idle(char, 1);
  //FIND ORDER
  let orders = orderManager.state.filter((o)=>{
    if(o.worker) return false;
    if(o.item) return false;
    return true;
  })
  if(orders.length==0){
    yield *actions.wandertoAdjacentTile(char);
    return;
  }
  let order = orders[0];
  order.worker = char

  let obj = yield *forceUseObjectWithAbility(char, Ability.FRIDGE)
  let item = new Item({position: obj.block.center, type:'BASE'})
  itemManager.addItem(item);
  order.item = item;
  char.item = item;
  yield *forceUseObjectWithAbility(char, Ability.PREP_TABLE)
  yield *actions.idle(char, 1);
  item.type = 'PIZZAUNCOOKED'
  yield *forceUseObjectWithAbility(char, Ability.OVEN)
  yield *actions.idle(char, 2);
  item.type = 'PIZZA'
  obj = yield *forceUseObjectWithAbility(char, Ability.SERVE_TABLE)
  obj.item = char.item;
  char.item = null;
  order.worker = null;


  // yield *wander(char);
  // yield *placeItemOnEmptyTable(char, Ability.SERVE_TABLE);

}

function* forceUseObjectWithAbility(char:Character, ability:AbilityType):Generator<*,Obj,*>{
  let obj = yield *actions.findObject((o:Obj) => {
    if(o.character) return false;
    if(o.item) return false;
    return o.hasAbility(ability)
  })
  obj.character = char;
  yield *actions.pathToBlock(char, obj.block);
  yield *actions.placeItemOnBlock(char, obj.block)
  obj.character = null;
  return obj
}
