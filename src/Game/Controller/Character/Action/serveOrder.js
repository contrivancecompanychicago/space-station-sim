//@flow
import engine from 'Game/engine';

import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Obj from 'Game/Type/Object'
import type Block from 'Game/Block'

import state from 'Game/state'

export default function* serveOrder(char: Character, order: Order): Generator<*,*,*>{
  // let objectManager:ObjectManager = engine.getComponent('objectManager');
  // let orderManager:OrderManager = engine.getComponent('orderManager');
  let objectManager = state.object
  let orderManager = state.order
  let logManager = state.log
  order.worker = char
  if(order.item != undefined) {
    let item = order.item;
    if (!char.hasItem(item)) {
      let block = item.position.block
      let obj = objectManager.getObjectAtBlock(block);
      if (obj) {
        obj.setCharacter(char)
        // let shortestPathLength = Infinity;
        // let shortestPath: Array<Block>;
        // obj.getAccessBlocks().forEach(b => {
        //   let path = state.grid.getPath(char.position.block, b)
        //   if (path.length > 0 && path.length < shortestPathLength) { 
        //     shortestPathLength = path.length;
        //     shortestPath = path;
        //   }
        // })
        // if(shortestPath){
        //   yield *actions.followPath(char, shortestPath)
        // }else{
        //   throw new Error('path not found serveOrder')
        // }
        yield *actions.shortestPathToObject(char, obj);
        
        obj.removeCharacter()
        obj.removeItem();
      }
      char.addItem(item)
    }

    yield * actions.pathToBlock(char, order.customer.position.block);
    //give to customer
    order.customer.addItem(item);
    char.removeItem(item)
    //finish order

    order.status = 'FULFILLED'
    orderManager.state.splice(orderManager.state.indexOf(order), 1);
    yield * actions.wandertoAdjacentTile(char);

  }
}
