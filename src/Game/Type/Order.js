// @flow

export type OrderStatusType = 'PLACED'|'STARTED'|'FULFILLED'

import type {ItemType} from 'Game/Data/Item'

import {keys, defaults} from 'lodash';
import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'
export default class Order{
  customer: Character;
  worker: ?Character;
  item: ?Item;
  status: OrderStatusType;
  itemType: ItemType;
  constructor(params:{customer:Character}){
    defaults(this, params);
    if(!this.status) this.status = 'PLACED'
  }
}
