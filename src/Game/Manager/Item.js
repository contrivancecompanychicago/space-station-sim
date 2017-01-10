// @flow
import {keys, defaults} from 'lodash';
import Factory from 'Game/Factory/Item';
import Item from 'Game/Type/Item';

export default class ItemManager{
  type: string;
  state: Object;
  constructor(state:Object){
    this.type = 'itemManager';
    this.state = state;
  }
  addItem(item:Item){
    // item = Factory.create(item);
    // item = new Item(item);
    this.state[item.id] = item;
  }
}
