//@flow

import state from 'Game/state'

import actions from './index'

import Ability from 'Game/Data/Object/Ability'
import type {AbilityType} from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import Item from 'Game/Type/Item'
import type Obj from 'Game/Type/Object'
import type Order from 'Game/Type/Order'
// import {ItemType} from 'Game/Data/Item'

// import

// import {getLogManager, getGridManager, getObjectManager, getItemManager, getOrderManager} from 'Game/engine'

export default function* cook(char:Character):Generator<*,*,*>{

  let gridManager = state.grid
  let objectManager = state.object
  let itemManager = state.item
  let orderManager = state.order
  let logManager = state.log
  
  //FIND ORDER
  let orders = orderManager.state.filter((o:Order)=>{
    if(o.worker) return false;
    if(o.item) return false;
    if(o.type === 'PIZZA') return true;
  })
  if(orders.length==0){
    if(Math.random()<0.01)
      yield *actions.wandertoAdjacentTile(char);
    return;
  }
  let order = orders[0];
  logManager.addLog({
    message:char.toString()+' cooking '+order.type+' for '+order.customer.toString(),
    type:'EVENT'})

  char.setStatus('cooking food')
  yield *actions.cookPizza(char, order)

  logManager.addLog({
    message:char.toString()+' finished cooking '+order.type+' for '+order.customer.toString(),
    type:'EVENT'})

  
  char.setStatus('waiting for orders')

  // yield *wander(char);
  // yield *placeItemOnEmptyTable(char, Ability.SERVE_TABLE);

}
