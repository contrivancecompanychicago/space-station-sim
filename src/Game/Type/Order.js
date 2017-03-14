// @flow

export type OrderStatusType = 'ORDERED'|'STARTED'|'COOKED'|'FULFILLED'|'MADE'

import type {ItemType} from 'Game/Data/Item'

import ItemData from 'Game/Data/Item';

import state from 'Game/state'

import {keys, defaults} from 'lodash';
import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'

import uniqid from 'Util/uniqid'

export default class Order{
	item: ?string;
	status: OrderStatusType;
	type: ItemType;
	id: string;
	constructor(params:{customer:string, type:ItemType}){
		defaults(this, params);
		if(!this.status) this.status = 'ORDERED'
		if(!this.id) this.id = uniqid();
	}
	getData(){
		return ItemData.get(this.type)
	}


	customer: string;
	setCustomer(customer: Character) {
		this.customer = customer.id
	}
	getCustomer():Character{
		return state.character.getChar(this.customer)
	}

	setItem(item:Item){
		this.item = item.id;
	}
	getItem():?Item{
		if(this.item)
			return state.item.getItem(this.item)
		// return this.item;
	}


	worker: ?string;
	addWorker(char:Character){
		if(this.worker){
			if(this.worker !== char.id){
				throw new Error('order already has worker')
			}
		}
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

	nextStep(): ?ItemType {

		//todo: refactor into a loop or whatever.

		let item:?Item = this.getItem();
		let wanted: ItemType = this.type;
		// debugger;
		// let wanted = ItemData.get(order.type);
		//find what step we are at
		if (item && item.type == wanted) {
			return //its already made nothing to do
		}
		let data:ItemDataType = ItemData.get(wanted);
		let reqd:?ItemType = data.requires.itemType;
		if (item && item.type == reqd) {
			//at the right step
			return wanted
		}
		if (!reqd) {
			return wanted;
		}
		wanted = reqd;

		data = ItemData.get(wanted)
		reqd = data.requires.itemType
		if (item && item.type == reqd) {
			//at the right step
			return wanted
		}
		if (!reqd) {
			return wanted;
		}
		wanted = reqd;

		data = ItemData.get(wanted)
		reqd = data.requires.itemType
		if (!reqd) {
			return wanted;
		}
	}
	isServable():boolean{
		if(this.item){
			if(this.getItem().type == this.type){
				return true;
			}
		}
		return false
	}
}
