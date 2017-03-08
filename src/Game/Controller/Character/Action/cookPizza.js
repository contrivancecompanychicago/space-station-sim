//@flow

import actions from './index';
// import engine from 'Game/engine'
import state from 'Game/state'


import type Order from 'Game/Type/Order'
import Item from 'Game/Type/Item'
import type Character from 'Game/Type/Character'
import Ability from 'Game/Data/Object/Ability'

import {Tasks} from 'Game/Data/Task'


export default function* cookPizza(char:Character, order:Order):Generator<*,*,*>{

	// order.worker = char
	order.addWorker(char);
	order.status = 'STARTED'
	let obj = yield *actions.forceUseObjectWithAbility(char, Ability.FRIDGE)
	let item:Item = new Item({position: obj.block.center, type:'BASE'})
	state.item.addItem(item);
	order.item = item;
	char.addItem(item)
	yield *actions.forceUseObjectWithAbility(char, Ability.PREP_TABLE)
	yield *actions.idle(char, 1);
	item.type = 'PIZZAUNCOOKED'
	//BREAK
	yield *actions.forceUseObjectWithAbility(char, Ability.OVEN)
	yield *actions.idle(char, 2);
	item.type = 'PIZZA'
	obj = yield *actions.forceUseObjectWithAbility(char, Ability.SERVE_TABLE)
	obj.addItem(item);
	// char.item = null;
	char.removeItem(item);
	order.status = "COOKED"
	order.removeWorker(char);

}
