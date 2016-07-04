import uniqid from 'Util/uniqid';
import {keys, defaults} from 'lodash';

export default class Item{
  constructor(state){
    this.type = 'itemManager';
    this.state = state;
  }
  addItem(item){
    if(!item.id)
      item.id = uniqid();
    defaults(item, {
      x:0,
      y:0,
    });
    this.state[item.id] = item;
  }
}
