//@flow

import actions from './index';
import engine from 'Game/engine'

import type ItemManager from 'Game/Manager/Item'

import type Order from 'Game/Type/Order'
import Item from 'Game/Type/Item'
import type Character from 'Game/Type/Character'
import Ability from 'Game/Data/Object/Ability'

export default function* makeCoffee(char:Character, order:Order):Generator<*,*,*>{

  let itemManager:ItemManager = engine.getComponent('itemManager')
  order.worker = char
  order.status = 'STARTED'
  let obj = yield *actions.forceUseObjectWithAbility(char, Ability.MAKE_COFFEE)
  let item = new Item({position: obj.block.center, type:'COFFEE'})
  itemManager.addItem(item);
  order.item = item;
  // char.item = item;
  char.addItem(item)
  yield *actions.idle(char, 2);
  obj = yield *actions.forceUseObjectWithAbility(char, Ability.SERVE_TABLE)
  obj.item = item;
  char.removeItem(item)
  order.status = "COOKED"
  order.worker = null;

}
