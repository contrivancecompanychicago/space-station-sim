//@flow
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import idle from './idle';
import wander from './wander'

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'

import type OrderManager from 'Game/Manager/Order';
import Order from 'Game/Type/Order'
import type ItemManager from 'Game/Manager/Item';

import type Character from 'Game/Type/Character'
export default function* cook(char:Character):Generator<*,*,*>{

  let itemManager:ItemManager = engine.getComponent('itemManager')
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let orderManager:OrderManager = engine.getComponent('orderManager');
  yield *pathToObjectWithAbility(char, Ability.CHAIR);
  //PLACE ORDER!
  orderManager.addOrder(new Order({customer:char}));
  while(!char.item){
    yield; //wait til I get my shit.
  }

  yield *idle(char, 5);
  yield *wander(char);
  if(char.item)
    itemManager.removeItem(char.item);
  char.item = null;


}
