
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'
export default function* serveDrink(char: Character): Generator<*,*,*>{

    //LOOK FOR COFFEE ORDERS
    let coffeeOrders = state.order.getOrders().filter((o) => {
        return o.type === 'COFFEE'
            && o.status === 'ORDERED'
            && o.getWorker() === undefined
    })
    if(coffeeOrders.length > 0) {

        state.log.addLog({
            message: char.toString() + ' making coffee for ' + coffeeOrders[0].getCustomer().toString(),
            type: 'EVENT'
        })
        char.setStatus('making coffee')
        yield * actions.makeCoffee(char, coffeeOrders[0])

        char.setStatus('serving coffee')
        yield * actions.serveOrder(char, coffeeOrders[0]);
    }
}