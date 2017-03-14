//@flow

import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Obj from 'Game/Type/Object'
import type Block from 'Game/Block'

import state from 'Game/state'

export default function* serveOrder(char: Character, order: Order): Generator<*,*,*>{
	let item = order.getItem();
	if(item) {
		order.addWorker(char)
		yield * actions.pickUpItem(char, item);
		yield * actions.pathToBlock(char, order.getCustomer().position.block);
		//give to customer
		order.getCustomer().addItem(item);
		char.removeItem(item)
		//finish order

		order.status = 'FULFILLED'
		order.removeWorker(char);
		state.order.deleteOrder(order)
		yield * actions.wandertoAdjacentTile(char);

	}

}
