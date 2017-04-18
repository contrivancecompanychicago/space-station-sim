
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'

import ItemData from 'Game/Data/Item'

import makeOrder from './makeOrder'
import serveOrder from './serveOrder'
import wanderToAdjacentTile from './wanderToAdjacentTile';

export default function* worker(char: Character): Generator<*,*,*>{

	let order;

	//PICK UP FROM LOAD
	state.order.getOrders().filter(o => {
		if (o.getWorker() == char) {
			order = o;
			// console.log('found worker order', o)
		}
	})
	if(order) { //RESUME ORDER AFTER LOADING GAME
		//check if the order is servable
		let item = order.getItem();
		if(item && item.type == order.type){
			yield * serveOrder(char, order);
		}else{
			yield * makeOrder(char, order);
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
		order = orders[0]; //grab the first one
		//TODO: find closest order
		yield * makeOrder(char, order);
	}

	//FIND ORDERS TO SERVE
	orders = state.order.getOrders().filter(o => {
		return !o.getWorker()
			&& char.hasTaskType('SERVEFOOD')
			&& o.isServable();
	})
	if(orders.length > 0){
		order = orders[0];
		yield * serveOrder(char, order);
	}
	
	char.setStatus('waiting for something to do')
	if(Math.random()< 0.01)
		// yield *wanderToAdjacentTile(char);
	return;
}