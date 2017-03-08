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
		return o.worker == undefined
			&& o.status === 'MADE'
	});
	
	if(orders.length > 0){
		let order = orders[0];
		char.setStatus('cooking order')
		order.addWorker(char);
		let item = order.item
		let obj = state.object.getObjectAtBlock(item.position.block)
		if(obj){
			obj.setCharacter(char)
			yield *actions.shortestPathToObject(char, obj);
			obj.removeCharacter()
			obj.removeItem();
			char.addItem(item);
			
			yield *actions.forceUseObjectWithAbility(char, Ability.OVEN)
			yield *actions.idle(char, 2);
			item.type = 'PIZZA'
			obj = yield *actions.forceUseObjectWithAbility(char, Ability.SERVE_TABLE)
			obj.addItem(item);
			// char.item = null;
			char.removeItem(item);
			order.status = "COOKED"

		}else{
			throw new Error('cant find object to pick item up from')
		}
		order.removeWorker(char)

	}

}
