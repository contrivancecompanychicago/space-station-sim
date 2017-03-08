
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'
import type Obj from 'Game/Type/Object';
export default function* useCoffeeAbility(char: Character, object:Obj): Generator<*,*,*>{

	char.setObject(object);
    //LOOK FOR COFFEE ORDERS
    let coffeeOrders = state.order.getOrders().filter((o) => {
        return o.type === 'COFFEE'
            && o.status === 'ORDERED'
            && o.worker === undefined
    })
    if(coffeeOrders.length > 0) {

        state.log.addLog({
            message: char.toString() + ' making coffee for ' + coffeeOrders[0].customer.toString(),
            type: 'EVENT'
        })
        char.setStatus('making coffee')
        yield * actions.makeCoffee(char, coffeeOrders[0])

        char.setStatus('serving coffee')
        yield * actions.serveOrder(char, coffeeOrders[0]);
    }
	char.clearObject();
}