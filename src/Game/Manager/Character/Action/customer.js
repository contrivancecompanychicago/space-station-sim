//@flow
import * as engine from 'Game/engine';


import actions from './index'

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'

import type OrderManager from 'Game/Manager/Order';
import type ObjectManager from 'Game/Manager/Object';
import type ItemManager from 'Game/Manager/Item';
import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

import Order from 'Game/Type/Order'
export default function* customer(char:Character):Generator<*,*,*>{

  let itemManager = engine.getItemManager()
  let gridManager = engine.getGridManager()
  let objectManager = engine.getObjectManager()
  let orderManager = engine.getOrderManager()
  let charManager = engine.getCharacterManager();

  // let chairs = objectManager.getObjects().filter((o:Obj) => {
  //   return (o.hasAbility(Ability.CHAIR) && o.character === null)
  // })
  // console.log(chairs.length);

  let chair = yield *actions.pathToObjectWithAbility(char, Ability.CHAIR);
  if(chair){
    chair.character = char
    yield *actions.moveToBlockCenter(char, chair.block)

    //PLACE ORDER!
    let orders:Array<Order> = []

    let pizza = new Order({customer:char, type:'PIZZA'})
    orders.push(pizza)
    orderManager.addOrder(pizza);
    let coffee = new Order({customer:char, type:'COFFEE'})
    orders.push(coffee)
    orderManager.addOrder(coffee);
    let numFulfilled = 0;
    while(numFulfilled !== orders.length){
      numFulfilled = 0;
      orders.forEach((o) => {
        if(o.status === 'FULFILLED') numFulfilled++;
      })
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
  }else{
    // console.log('cant find a chair');
  }
  // yield *actions.wander(char);

  //WIPE CLEAN - hacky
  while(char.item.length>0){
    let item = char.item[0];
    itemManager.removeItem(item);
    char.removeItem(item);
  }

  engine.getPlayerManager().addMoney(20)

  yield *actions.pathToObjectWithAbility(char, Ability.SPAWN)

  charManager.removeCharacter(char);




}
