// @flow

import Item from 'Game/Type/Item'
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'
import Ability from 'Game/Data/Object/Ability'

import type Order from 'Game/Type/Order'

import type Character from 'Game/Type/Character'

export default function* make(char: Character, order:?Order): Generator<*,*,*>{
	if(!order){
		let orders = state.order.getOrders().filter((o:Order)=>{
			if(o.getWorker()) return false;
			if(o.item) return false;
			if(o.type === 'PIZZA') return true;
		});
		if(orders.length==0) return; //early
		
		order = orders[0];
	}

	char.setStatus('making')
	order.status = 'STARTED'

	// console.log('forceUseObjectWithAbility', Ability.FRIDGE);
	
	// let obj = yield *actions.forceUseObjectWithAbility(char, Ability.FRIDGE)
	// let item:Item = new Item({position: obj.block.center, type:'BASE'})
	// state.item.addItem(item);
	// order.setItem(item);
	let item = yield *actions.makeOrder(char, order);
	item = order.getItem();
	order.addWorker(char);
	char.addItem(item)
	let table = yield *actions.forceUseObjectWithAbility(char, Ability.PREP_TABLE)
	char.removeItem(item);
	table.addItem(item);
	yield *actions.idle(char, 1);
	item.type = 'PIZZAUNCOOKED'
	order.removeWorker(char);
	order.status = 'MADE'
}