// @flow
import {keys, defaults} from 'lodash';
import Order from 'Game/Type/Order';

import type {OrderState} from 'Game/state'

import Manager from 'Game/Manager'


export default class OrderManager extends Manager{
  type: string;
  state: OrderState;
  constructor(state:OrderState){
    super()
    this.type = 'orderManager';
    this.state = state;
  }
  addOrder(order:Order){
    this.state.push(order);
  }
}
