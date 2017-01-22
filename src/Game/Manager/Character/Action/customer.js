//@flow
import engine from 'Game/engine';


import actions from './index'

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'

import type OrderManager from 'Game/Manager/Order';
import type ObjectManager from 'Game/Manager/Object';
import Order from 'Game/Type/Order'
import type ItemManager from 'Game/Manager/Item';

import type Character from 'Game/Type/Character'
export default function* cook(char:Character):Generator<*,*,*>{

  let itemManager:ItemManager = engine.getComponent('itemManager')
  let gridManager = engine.getComponent('gridManager');
  let objectManager:ObjectManager = engine.getComponent('objectManager');
  let orderManager:OrderManager = engine.getComponent('orderManager');
  let chair = yield *actions.pathToObjectWithAbility(char, Ability.CHAIR);
  if(chair){
    chair.character = char
    yield *actions.moveToBlockCenter(char, chair.block)

    //PLACE ORDER!
    orderManager.addOrder(new Order({customer:char}));
    while(!char.item){
      yield; //wait til I get my shit.
    }
    chair.character = null;

    //check for table;
    let check = char.position.block
    check.y++;
    let table = objectManager.getObjectAtBlock(check);
    if(table){
      yield *actions.placeItemOnBlock(char, table.block)
    }

    yield *actions.idle(char, 5);
  }
  yield *actions.wander(char);
  if(char.item)
    itemManager.removeItem(char.item);
  char.item = null;


}
