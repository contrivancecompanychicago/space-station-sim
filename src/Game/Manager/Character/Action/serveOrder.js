//@flow
import engine from 'Game/engine';

import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Obj from 'Game/Type/Object'

import state from 'Game/state'

export default function* serveOrder(char:Character, order:Order):Generator<*,*,*>{
  // let objectManager:ObjectManager = engine.getComponent('objectManager');
  // let orderManager:OrderManager = engine.getComponent('orderManager');
  let objectManager = state.object
  let orderManager = state.order
  let logManager = state.log
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

    order.status = 'FULFILLED'
    orderManager.state.splice(orderManager.state.indexOf(order), 1);
    yield *actions.wandertoAdjacentTile(char);

  }
}
