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
import type Order from 'Game/Type/Order'
// import {ItemType} from 'Game/Data/Item'

// import

export default function* cook(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let itemManager:ItemManager = engine.getComponent('itemManager')
  let orderManager:OrderManager = engine.getComponent('orderManager')

  //FIND ORDER
  let orders = orderManager.state.filter((o:Order)=>{
    if(o.worker) return false;
    if(o.item) return false;
    if(o.type === 'PIZZA') return true;
  })
  if(orders.length==0){
    yield *actions.wandertoAdjacentTile(char);
    return;
  }
  let order = orders[0];

  yield *actions.cookPizza(char, order)


  // yield *wander(char);
  // yield *placeItemOnEmptyTable(char, Ability.SERVE_TABLE);

}
