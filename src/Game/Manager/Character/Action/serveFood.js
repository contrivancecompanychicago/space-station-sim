
import actions from './index'
import state from 'Game/state'
import { Tasks } from 'Game/Data/Task'
export default function* serveFood(char: Character): Generator<*,*,*>{
    let gridManager = state.grid
    let objectManager = state.object
    let itemManager = state.item
    let orderManager = state.order
    let logManager = state.log

    //LOOK FOR COOKED PIZZAS
    let orders = orderManager.state.filter((o) => {
        // if(o.worker) return false;
        // if(o.item && o.type === 'PIZZA') return true;
        return o.worker == undefined
            && o.status === 'COOKED'
    });
    if(orders.length==0) {

    }else{
        let order = orders[0];

        char.setStatus('serving order')
      logManager.addLog({
            message: char.toString() + ' serving to ' + order.customer.toString(),
            type: 'EVENT'
        })
      yield *actions.serveOrder(char, order);

    }
}