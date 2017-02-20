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
}
