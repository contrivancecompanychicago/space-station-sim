// @flow

import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import Item from 'Game/Type/Item'

import state from 'Game/state'

import ItemData from 'Game/Data/Item'
import type {ItemType, ItemDataType } from 'Game/Data/Item'

import shortestPathToObject from './shortestPathToObject'
import forceUseObjectWithAbility from './forceUseObjectWithAbility'
import idle from './idle'

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
					yield * shortestPathToObject(char, obj);
					obj.removeCharacter()

					obj.removeItem();
				}
				char.addItem(item);
			}
		}
		if (data.requires.objectAbility) {
			//path to the appropriate object
			let obj = yield * forceUseObjectWithAbility(char, data.requires.objectAbility)
			
			if (!item) {
				item = new Item({ position: obj.block.center, type: making })
				state.item.addItem(item);
				order.setItem(item);
				char.addItem(item)
			}
		}
		// console.log(item, data.requires);
		if(data.requires.time){
			yield * idle(char, data.requires.time);
		}
		
		if (item) {
			item.type = making;

			//ADD EXP $$$$$$$$
			char.addRecipeExperience(order.recipe, 20)
			
			if (data.requires.leaveAtObjectAbility) {
				let obj = yield * forceUseObjectWithAbility(char, data.requires.leaveAtObjectAbility)
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
