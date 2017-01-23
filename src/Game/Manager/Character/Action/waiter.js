//@flow
import engine from 'Game/engine';

import actions from './index'


import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import type ObjectManager from 'Game/Manager/Object'
import type OrderManager from 'Game/Manager/Order'



export default function* waiter(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager:ObjectManager = engine.getComponent('objectManager');
  let orderManager:OrderManager = engine.getComponent('orderManager');


  // let objs = objectManager.getObjectsWithItemType('TEST')

  //LOOK FOR COFFEE ORDERS
  let coffeeOrders = orderManager.state.filter((o) => {
    return o.type==='COFFEE'
      && o.status === 'ORDERED'
      && o.worker === undefined
  })
  // console.log(coffeeOrders.length, 'coffee orders');
  if(coffeeOrders.length > 0){
    yield *actions.makeCoffee(char, coffeeOrders[0])
  }

  //LOOK FOR COOKED PIZZAS
  let orders = orderManager.state.filter((o) => {
    // if(o.worker) return false;
    // if(o.item && o.type === 'PIZZA') return true;
    return o.worker == undefined
      && o.status === 'COOKED'
  });
  if(orders.length==0) {
    yield *actions.wandertoAdjacentTile(char);
    return;
  }
  let order = orders[0];
  yield *actions.serveOrder(char, order);

}
