
import actions from './index'

import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'

import state from 'Game/state'

import shortestPathToObject from './shortestPathToObject'
import pathToBlock from './pathToBlock'

export default function* pickUpItem(char: Character, item: Item): Generator<*,*,*>{
	if(!char.hasItem(item)) {
		let block = item.position.block
		let obj = state.object.getObjectAtBlock(block);
		if (obj) {
			yield * shortestPathToObject(char, obj);
			obj.removeItem(item);
		} else {
			//not on an object
			yield * pathToBlock(char, block);
		}
		char.addItem(item)
	}
}