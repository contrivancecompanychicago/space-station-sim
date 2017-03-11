// @flow

export type OrderStatusType = 'ORDERED'|'STARTED'|'COOKED'|'FULFILLED'

import type {ItemType} from 'Game/Data/Item'

import ItemData from 'Game/Data/Item';

import state from 'Game/state'

import {keys, defaults} from 'lodash';
import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'
export default class Order{
	item: ?Item;
	status: OrderStatusType;
	type: ItemType;
	constructor(params:{customer:Character, type:ItemType}){
		defaults(this, params);
		if(!this.status) this.status = 'ORDERED'
	}
	getData(){
		return ItemData.get(this.type)
	}
	customer: Character;
	getCustomer(){
		return this.customer;
	}

	setItem(item:Item){
		this.item = item;
	}


	worker: ?string;
	addWorker(char:Character){
		if(this.worker) throw new Error('order already has worker')
		this.worker = char.id;
	}
	removeWorker(char:?Character){
		if(char && char.id !== this.worker) throw new Error('removing worker who wasnt assigned');
		this.worker = null;
	}
	getWorker():?Character{
		if(this.worker)
			return state.character.getChar(this.worker)
		// return this.worker
	}
}
