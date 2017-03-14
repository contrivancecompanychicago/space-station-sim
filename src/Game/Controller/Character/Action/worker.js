
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'

import ItemData from 'Game/Data/Item'

export default function* worker(char: Character): Generator<*,*,*>{

	//PICK UP FROM LOAD
	let order;
	// console.log('orders', state.order.getOrders());

	state.order.getOrders().filter(o => {
		if (o.getWorker() == char) {
			order = o;
			// console.log('found worker order', o)
		}
	})

	if(order) {
		// debugger;
		//check if the order is servable
		let item = order.getItem();
		if(item && item.type == order.type){
			yield * actions.serveOrder(char, order);
		}else{
			yield * actions.makeOrder(char, order);
		}
	}

	// FIND ORDERS TO MAKE
	let thingsICanMake = [];
	let thingsImLookingFor = []
	ItemData.each((k, v) => {
		if(char.hasTaskType(v.requires.characterTaskType)){
			thingsICanMake.push(k);
			thingsImLookingFor.push(v.requires.itemType);
		}
	});
	// debugger;
	let orders = state.order.getOrders().filter(o => {
		if(o.getWorker()) return false;

		let item = o.getItem();
		let itemType;
		if(item) itemType = item.type
		let nextStep = o.nextStep()
		if(!nextStep) return false; //item already made
		let data = ItemData.get(nextStep)
		if(char.hasTaskType(data.requires.characterTaskType)){
			//this is a doubleup refactor it
			return thingsImLookingFor.indexOf(itemType) > -1 //and im looking for it
		}

	})
	if(orders.length > 0){
		order = orders[0];
		yield * actions.makeOrder(char, order);
	}
	//FIND ORDERS TO SERVE

	orders = state.order.getOrders().filter(o => {
		return !o.getWorker()
			&& char.hasTaskType('SERVEFOOD')
			&& o.isServable();
	})
	
	if(orders.length > 0){
		order = orders[0];
		yield * actions.serveOrder(char, order);
	}


	

	// if(char.hasTaskType(Tasks.MAKE)) {
	// 	yield * actions.make(char);
	// }
	// if(char.hasTaskType(Tasks.COOK)) {
	// 	yield * actions.cook(char);
	// }
	// if(char.hasTaskType(Tasks.SERVEDRINK)) {
	// 	yield * actions.serveDrink(char);
	// }

	// if(char.hasTaskType(Tasks.SERVEFOOD)) {
	// 	yield * actions.serveFood(char);
	// }
	
	char.setStatus('waiting for something to do')
	if(Math.random()< 0.01)
		yield *actions.wandertoAdjacentTile(char);
	return;
}