
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'
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
		if (order.type == 'COFFEE') {
			yield * actions.serveDrink(char, order);
		}
	}

	if(char.hasTaskType(Tasks.MAKE)) {
		yield * actions.make(char, order);
	}
	if(char.hasTaskType(Tasks.COOK)) {
		yield * actions.cook(char, order);
	}
	if(char.hasTaskType(Tasks.SERVEDRINK)) {
		yield * actions.serveDrink(char, order);
	}

	if(char.hasTaskType(Tasks.SERVEFOOD)) {
		yield * actions.serveFood(char, order);
	}
	
	char.setStatus('waiting for something to do')
	if(Math.random()< 0.01)
		yield *actions.wandertoAdjacentTile(char);
	return;
}