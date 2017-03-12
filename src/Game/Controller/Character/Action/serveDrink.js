// @flow
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
export default function* serveDrink(char: Character, order:?Order): Generator<*,*,*>{

	if(!order){

		let coffeeOrders = state.order.getOrders().filter((o) => {
			return o.type === 'COFFEE'
				&& o.status === 'ORDERED'
				&& o.getWorker() === undefined
		})
		if(coffeeOrders.length > 0) {
			order = coffeeOrders[0]
		}

	}
	if(order) {
		state.log.addLog({
			message: char.toString() + ' making coffee for ' + order.getCustomer().toString(),
			type: 'EVENT'
		})
		if(!order.item){
			char.setStatus('making coffee')
			yield * actions.makeCoffee(char, order)

		}else{
			//if there is an item and the char doesnt have it
			if( !char.hasItem(order.getItem())) throw new Error('char doesnt have order item')
		}

		char.setStatus('serving coffee')
		yield * actions.serveOrder(char, order);

	}

}