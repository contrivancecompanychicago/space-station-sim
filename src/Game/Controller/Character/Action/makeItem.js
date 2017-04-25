
import state from 'Game/state';

import Item from 'Game/Type/Item'
import ItemData from 'Game/Data/Item'

import type Character from 'Game/Type/Character'
import type {ItemType, ItemDataType } from 'Game/Data/Item'

import idle from './idle'
import shortestPathToObject from './shortestPathToObject'
import forceUseObjectWithAbility from './forceUseObjectWithAbility'


export default function* makeItem(char: Character, making:ItemType , item: ?Item, order: ?Order): Generator<*,*,*>{

	let data = ItemData.get(making);

	if(!data){
		throw new Error('cant find item data. breaking to avoid possible recursive loop');
	}
	
	//IF NEEDS AN ITEM TO START
	if (data.requires.itemType) {
		//get our required item types
		if (!item){
			//RECURSE
			item = yield * makeItem(char, data.requires.itemType, item, order);
		}

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

	//IF REQUIRES AN OBJECT WITH ABILITY
	if (data.requires.objectAbility) {
		//path to the appropriate object
		let obj = yield * forceUseObjectWithAbility(char, data.requires.objectAbility)
		
		if (!item) {
			item = new Item({ position: obj.block.center, type: making })
			if(order) order.setItem(item);
			state.item.addItem(item);
			char.addItem(item)
		}
	}

	// OPTIONAL WAIT
	if(data.requires.time){
		yield * idle(char, data.requires.time);
	}
	
	//FINISH UP ITEM
	if (item) {
		item.type = making;
		//ADD EXP $$$$$$$$
		// char.addRecipeExperience(order.recipe, 20)
		if (data.requires.leaveAtObjectAbility) {
			let obj = yield * forceUseObjectWithAbility(char, data.requires.leaveAtObjectAbility)
			obj.addItem(item);
		}
		char.removeItem(item);
	} else {
		throw new Error('makeitem leave at object no item')
	}

	return item
}