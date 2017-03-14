//@flow

import state from 'Game/state'

import actions from './index'

import Ability from 'Game/Data/Object/Ability'
import type {AbilityType } from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import Item from 'Game/Type/Item'
import type Obj from 'Game/Type/Object'
import type Order from 'Game/Type/Order'

export default function* cook(char: Character): Generator<*,*,*>{

	let orders = state.order.getOrders().filter((o:Order) => {
		return o.getWorker() == undefined
			&& o.status !== 'FULFILLED'
			&& o.type === 'PIZZA'
	});
	
	if(orders.length > 0){
		let order = orders[0];
		yield * actions.makeOrder(char, order)
		// char.setStatus('cooking order')
		// order.addWorker(char);
		// let item = order.getItem();
		// let obj = state.object.getObjectAtBlock(item.position.block)
		// if(obj){
		// 	obj.setCharacter(char)
		// 	yield *actions.shortestPathToObject(char, obj);
		// 	obj.removeCharacter()
		// 	obj.removeItem();
		// }
		// char.addItem(item);
		
		// yield *actions.forceUseObjectWithAbility(char, Ability.OVEN)
		// yield *actions.idle(char, 2);
		// item.type = 'PIZZA'
		// obj = yield *actions.forceUseObjectWithAbility(char, Ability.SERVE_TABLE)
		// obj.addItem(item);
		// // char.item = null;
		// char.removeItem(item);
		// order.status = "COOKED"

		// order.removeWorker(char)

	}

}
