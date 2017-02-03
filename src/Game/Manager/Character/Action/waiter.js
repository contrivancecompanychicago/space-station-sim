//@flow
import engine from 'Game/engine';

import actions from './index'


import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import type ObjectManager from 'Game/Manager/Object'
import type OrderManager from 'Game/Manager/Order'

import {getLogManager, getGridManager, getObjectManager, getItemManager, getOrderManager} from 'Game/engine'

export default function* waiter(char:Character):Generator<*,*,*>{
  let gridManager = getGridManager()
  let objectManager = getObjectManager()
  let itemManager = getItemManager()
  let orderManager = getOrderManager()
  let logManager = getLogManager()


  // let objs = objectManager.getObjectsWithItemType('TEST')

  //LOOK FOR COFFEE ORDERS
  let coffeeOrders = orderManager.state.filter((o) => {
    return o.type==='COFFEE'
      && o.status === 'ORDERED'
      && o.worker === undefined
  })
  if(coffeeOrders.length > 0){

    logManager.addLog({
      message:char.toString()+' making coffee for '+coffeeOrders[0].customer.toString(),
      type:'EVENT'})
    yield *actions.makeCoffee(char, coffeeOrders[0])
    yield *actions.serveOrder(char, coffeeOrders[0]);
  }

  //LOOK FOR COOKED PIZZAS
  let orders = orderManager.state.filter((o) => {
    // if(o.worker) return false;
    // if(o.item && o.type === 'PIZZA') return true;
    return o.worker == undefined
      && o.status === 'COOKED'
  });
  if(orders.length==0) {

    if(Math.random()<0.01)
      yield *actions.wandertoAdjacentTile(char);
    return;
  }else{
    let order = orders[0];
    logManager.addLog({
      message:char.toString()+' serving to '+order.customer.toString(),
      type:'EVENT'})
    yield *actions.serveOrder(char, order);

  }

}
