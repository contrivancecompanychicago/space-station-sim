// @flow

import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import Item from 'Game/Type/Item'

import state from 'Game/state'

import ItemData from 'Game/Data/Item'
import type {ItemType, ItemDataType } from 'Game/Data/Item'

import actions from './index'

/** takes one step in order manufacture */
export default function* makeOrder(char: Character, order: Order): Generator<*,*,*>{

    let item:?Item = order.getItem();
    let making:?ItemType = order.nextStep();
    if(making) {
        order.addWorker(char)
        // if(making == 'COFFEE') debugger;
        let data = ItemData.get(making);
        if (data.requires.itemType) {
            //get our required item types
            if (!item) throw new Error('item doesnt exist nextStep failing')

            if (!char.hasItem(item)) {
                // TODO go pick up item
                let obj = state.object.getObjectAtBlock(item.position.block)
                if (obj) {
                    obj.setCharacter(char)
                    yield * actions.shortestPathToObject(char, obj);
                    obj.removeCharacter()

                    obj.removeItem();
                }
                char.addItem(item);
            }
        }
        if (data.requires.objectAbility) {
            //path to the appropriate object
            let obj = yield * actions.forceUseObjectWithAbility(char, data.requires.objectAbility)
            if (!item) {
                item = new Item({ position: obj.block.center, type: making })
                state.item.addItem(item);
                order.setItem(item);
                char.addItem(item)
            }
        }
        // console.log(item, data.requires);
        yield * actions.idle(char, 2);
        
        if (item) {
            item.type = making;
            
            if (data.requires.leaveAtObjectAbility) {
                let obj = yield * actions.forceUseObjectWithAbility(char, data.requires.leaveAtObjectAbility)
                obj.addItem(item);
            }

            char.removeItem(item);
        } else {
            throw new Error('makeorder leave at object no item')
        }

        order.removeWorker(char);
        // debugger;
    }
    return item; //always have an item at the end of this or else error

}

// export function nextStep(order: Order): ?ItemType {

//     //todo: refactor into a loop or whatever.

//     let item:?Item = order.getItem();
//     let wanted: ItemType = order.type;
//     // debugger;
//     // let wanted = ItemData.get(order.type);
//     //find what step we are at
//     if (item && item.type == wanted) {
//         return //its already made nothing to do
//     }
//     let data:ItemDataType = ItemData.get(wanted);
//     let reqd:?ItemType = data.requires.itemType;
//     if (item && item.type == reqd) {
//         //at the right step
//         return wanted
//     }
//     if (!reqd) {
//         return wanted;
//     }
//     wanted = reqd;

//     data = ItemData.get(wanted)
//     reqd = data.requires.itemType
//     if (item && item.type == reqd) {
//         //at the right step
//         return wanted
//     }
//     if (!reqd) {
//         return wanted;
//     }
//     wanted = reqd;

//     data = ItemData.get(wanted)
//     reqd = data.requires.itemType
//     if (!reqd) {
//         return wanted;
//     }
// }