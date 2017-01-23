//@flow
import engine from 'Game/engine';
import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type ObjectManager from 'Game/Manager/Object'
import type OrderManager from 'Game/Manager/Order'


export default function* serveOrder(char:Character, order:Order):Generator<*,*,*>{
  let objectManager:ObjectManager = engine.getComponent('objectManager');
  let orderManager:OrderManager = engine.getComponent('orderManager');
  order.worker = char
  if(order.item){
    let block = order.item.position.block
    let obj = objectManager.getObjectAtBlock(block);
    if(obj) obj.character = char;
    yield *actions.pathToBlock(char, block);
    if(obj) obj.character = null;
    if(obj) obj.item = null;
    char.item = order.item;
    yield *actions.pathToBlock(char, order.customer.position.block);
    //give to customer
    order.customer.item = char.item;
    char.item = null;
    //finish order
    order.status = 'FULFILLED'
    orderManager.state.splice(orderManager.state.indexOf(order), 1);
    yield *actions.wandertoAdjacentTile(char);

  }
}
