// @flow
import {keys, defaults} from 'lodash';
import Item from 'Game/Type/Item';

import type {ItemState} from 'Game/state'

export default class ItemManager{
  type: string;
  state: ItemState;
  constructor(state:ItemState){
    this.type = 'itemManager';
    this.state = state;
  }
  addItem(item:Item){
    this.state[item.id] = item;
  }
  removeItem(item:Item){
    delete this.state[item.id];
  }
}
