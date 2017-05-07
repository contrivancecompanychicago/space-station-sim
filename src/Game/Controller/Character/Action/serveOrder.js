//@flow

// import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Obj from 'Game/Type/Object'
import type Block from 'Game/Block'

import state from 'Game/state'

import pickUpItem from './pickUpItem'
import pathToBlock from './pathToBlock'
import wanderToAdjacentTile from './wanderToAdjacentTile'
import giveItem from './giveItem'

export default function* serveOrder(char: Character, order: Order): Generator<*,*,*>{
	let item = order.getItem();
	// debugger;
	if(item) {
		order.addWorker(char)

		yield * giveItem(char, item, order.getCustomer())

		// yield * pickUpItem(char, item);
		// yield * pathToBlock(char, order.getCustomer().position.block);
		// //give to customer
		// order.getCustomer().addItem(item);
		// char.removeItem(item)

		//finish order

		order.status = 'FULFILLED'
		order.removeWorker(char);
		state.order.deleteOrder(order)
		yield * wanderToAdjacentTile(char);

	}

}
