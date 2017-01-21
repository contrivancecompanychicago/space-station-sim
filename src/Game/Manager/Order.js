// @flow
import {keys, defaults} from 'lodash';
import Order from 'Game/Type/Order';

import type {OrderState} from 'Game/state'

export default class OrderManager{
  type: string;
  state: OrderState;
  constructor(state:OrderState){
    this.type = 'orderManager';
    // console.log(state);
    this.state = state;
  }
  addOrder(order:Order){
    this.state.push(order);
  }
}
