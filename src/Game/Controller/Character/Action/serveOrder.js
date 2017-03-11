//@flow
import engine from 'Game/engine';

import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Obj from 'Game/Type/Object'
import type Block from 'Game/Block'

import state from 'Game/state'

export default function* serveOrder(char: Character, order: Order): Generator<*,*,*>{
	order.addWorker(char)
	if(order.item != undefined) {
		let item = order.getItem();
		if (!char.hasItem(item)) {
			let block = item.position.block
			let obj = state.object.getObjectAtBlock(block);
			if (obj) {
				obj.setCharacter(char)
				yield *actions.shortestPathToObject(char, obj);
				
				obj.removeCharacter()
				obj.removeItem();
			}
			char.addItem(item)
		}

		yield * actions.pathToBlock(char, order.getCustomer().position.block);
		//give to customer
		order.getCustomer().addItem(item);
		char.removeItem(item)
		//finish order

		order.status = 'FULFILLED'
		state.order.deleteOrder(order)
		yield * actions.wandertoAdjacentTile(char);

	}
}
