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

import makeItem from './makeItem';

/** takes one step in order manufacture */
export default function* makeOrder(char: Character, order: Order): Generator<*,*,*>{

	let item:?Item = order.getItem();
	let making:?ItemType = order.nextStep();
	if(making) {
		order.addWorker(char)

		item = yield * makeItem(char, making, item, order);

		if(item){
			order.setItem(item);
		}
		
		order.removeWorker(char);
		// debugger;
	}
	return item; //always have an item at the end of this or else error

}
