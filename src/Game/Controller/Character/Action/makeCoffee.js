//@flow

import actions from './index';
import engine from 'Game/engine'


import type Order from 'Game/Type/Order'
import Item from 'Game/Type/Item'
import type Character from 'Game/Type/Character'
import Ability from 'Game/Data/Object/Ability'

import state from 'Game/state'

export default function* makeCoffee(char:Character, order:Order):Generator<*,*,*>{

  order.worker = char
  order.status = 'STARTED'
  let obj = yield *actions.forceUseObjectWithAbility(char, Ability.MAKE_COFFEE)
  let item = new Item({position: obj.block.center, type:'COFFEE'})
  state.item.addItem(item);
  order.item = item;
  char.addItem(item)
  yield *actions.idle(char, 2);

  order.status = "COOKED"
  order.worker = null;

}
