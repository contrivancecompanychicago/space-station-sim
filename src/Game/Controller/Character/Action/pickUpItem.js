
import actions from './index'

import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'

import state from 'Game/state'


export default function* pickUpItem(char:Character, item:Item): Generator<*,*,*>{
    if (!char.hasItem(item)) {
        let block = item.position.block
        let obj = state.object.getObjectAtBlock(block);
        if (obj) {
            // obj.setCharacter(char)
            yield *actions.shortestPathToObject(char, obj);
            // obj.removeCharacter(char)
            obj.removeItem(item);
        }else{
            //not on an object
            yield * actions.pathToBlock(char, block);
        }
        char.addItem(item)
    }
}