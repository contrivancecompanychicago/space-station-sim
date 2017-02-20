//@flow
import * as engine from 'Game/engine';

import state from 'Game/state'

import actions from './index'

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

import Order from 'Game/Type/Order'
export default function* customer(char:Character):Generator<*,*,*>{

  let itemManager = state.item
  let gridManager = state.grid
  let objectManager = state.object
  let orderManager = state.order
  let charManager = state.character

  // let chairs = objectManager.getObjects().filter((o:Obj) => {
  //   return (o.hasAbility(Ability.CHAIR) && o.character === null)
  // })
  // console.log(chairs.length);
  char.setStatus('Sitting down')
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
      char.setStatus('waiting for order ('+numFulfilled+'/'+orders.length+')')
      numFulfilled = 0;
      orders.forEach((o) => {
        if(o.status === 'FULFILLED') numFulfilled++;
      })
      yield; //wait til I get my shit.
    }0
    chair.character = null;

    //check for table;
    let check = char.position.block
    check.y++;
    let table = objectManager.getObjectAtBlock(check);
    if(table){
      yield *actions.placeItemOnBlock(char, table.block)
    }
    char.setStatus('Eating')
    yield *actions.idle(char, 5);
    state.player.addMoney(20)
    while(char.item.length>0){
      let item = char.item[0];
      itemManager.removeItem(item);
      char.removeItem(item);
    }
    char.setStatus('Leaving')
    yield *actions.pathToObjectWithAbility(char, Ability.SPAWN)
    
  }else{
    char.setStatus('Nowhere to sit')
    yield *actions.pathToObjectWithAbility(char, Ability.SPAWN)
    // console.log('cant find a chair');
  }
  // yield *actions.wander(char);

  //WIPE CLEAN - hacky


  char.setStatus('Gone')
  charManager.removeCharacter(char);




}
