// @flow

import Order from 'Game/Type/Order';
export type OrderState = Array<Order>;

export default class OrderModel{
	state: OrderState;
	constructor(state:OrderState = []){
		this.state = state;
	}
	addOrder(order:Order){
		this.state.push(order);
	}
	getOrders():Array<Order>{
		return this.state;
	}
	deleteOrder(order:Order){
		this.state.splice(this.state.indexOf(order), 1);
	}
	save(){
		return this.state;
	}
	clear(){
		this.state = [];
	}
	load(obj:Array<Object>){
		this.state = obj.map(o => {
			return o;
		})
	}
}
