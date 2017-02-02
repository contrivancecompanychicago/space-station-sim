//@flow
import engine from 'Game/engine';

import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Obj from 'Game/Type/Object'
// import type ObjectManager from 'Game/Manager/Object'
// import type OrderManager from 'Game/Manager/Order'
import type LogManager from 'Game/Manager/Log'

import {getLogManager, getObjectManager, getOrderManager} from 'Game/engine'

export default function* serveOrder(char:Character, order:Order):Generator<*,*,*>{
  // let objectManager:ObjectManager = engine.getComponent('objectManager');
  // let orderManager:OrderManager = engine.getComponent('orderManager');
  let objectManager = getObjectManager()
  let orderManager = getOrderManager()
  let logManager:LogManager = getLogManager()
  order.worker = char
  if(order.item != undefined){
    let item = order.item;
    if(!char.hasItem(item)){
      let block = item.position.block
      let obj = objectManager.getObjectAtBlock(block);
      if(obj){
        (obj:Obj)
        obj.character = char;
        yield *actions.pathToBlock(char, obj.getAccessBlock());
        obj.character = null;
        obj.item = null;
      }
      char.addItem(item)
    }

    yield *actions.pathToBlock(char, order.customer.position.block);
    //give to customer
    order.customer.addItem(item);
    char.removeItem(item)
    //finish order
    logManager.addLog({
      message:order.customer.toString()+' got '+item.type,
      type:'EVENT'
    })

    order.status = 'FULFILLED'
    orderManager.state.splice(orderManager.state.indexOf(order), 1);
    yield *actions.wandertoAdjacentTile(char);

  }
}
