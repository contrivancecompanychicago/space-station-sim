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
import type OrderManager from 'Game/Manager/Order';



export default function* waiter(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager:ObjectManager = engine.getComponent('objectManager');
  let orderManager:OrderManager = engine.getComponent('orderManager')

  // let objs = objectManager.getObjectsWithItemType('TEST')
  // let objs = objectManager.getObjects().filter((o)=>{
  //   if(o.character) return false
  //   if(o.getData().abilities.indexOf('DINE_TABLE')>-1) return false;
  //   if(o.item&&o.item.type === 'TEST') return true;
  // })
  // // console.log(objs);
  // if(objs.length > 0){
  //   let obj = objs[0];
  //   obj.character = char;
  //   yield *pathToBlock(char, obj.block);
  //   //pick up item
  //   char.item = obj.item
  //   obj.item = null;
  //
  //   yield *placeItemOnEmptyTable(char, Ability.DINE_TABLE)
  //   obj.character = null;
  // }

  let orders = orderManager.state.filter((o) => {
    if(o.worker) return false;
    if(o.item) return true;
  });
  if(orders.length==0) return;
  let order = orders[0];
  order.worker = char
  // FLOWHACK //already checked it exists
  yield *pathToBlock(char, order.item.position.block);
  char.item = order.item;
  yield *pathToBlock(char, order.customer.position.block);
  //give to customer
  order.customer.item = char.item;
  char.item = null;
  //finish order
  orderManager.state.splice(orderManager.state.indexOf(order));

}
