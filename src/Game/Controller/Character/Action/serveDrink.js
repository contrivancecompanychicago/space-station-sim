
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'
export default function* serveDrink(char: Character): Generator<*,*,*>{
    let gridManager = state.grid
  let objectManager = state.object
  let itemManager = state.item
  let orderManager = state.order
  let logManager = state.log

    //LOOK FOR COFFEE ORDERS
    let coffeeOrders = orderManager.state.filter((o) => {
        return o.type === 'COFFEE'
            && o.status === 'ORDERED'
            && o.worker === undefined
    })
    if(coffeeOrders.length > 0) {

        logManager.addLog({
            message: char.toString() + ' making coffee for ' + coffeeOrders[0].customer.toString(),
            type: 'EVENT'
        })
        char.setStatus('making coffee')
        yield * actions.makeCoffee(char, coffeeOrders[0])

        char.setStatus('serving coffee')
        yield * actions.serveOrder(char, coffeeOrders[0]);
    }
}