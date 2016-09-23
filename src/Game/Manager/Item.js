
import {keys, defaults} from 'lodash';
import Factory from 'Game/Factory/Item';


export default class Item{
  constructor(state){
    this.type = 'itemManager';
    this.state = state;
  }
  addItem(item){
    item = Factory.create(item);
    this.state[item.id] = item;
  }
}
