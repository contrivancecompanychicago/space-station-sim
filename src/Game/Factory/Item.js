import {defaults} from 'lodash';

const base = {
  block: {
    x: 0,
    y: 0
  }
};


export default class ItemFactory{
  static create(item = {}){
    defaults(item, base);
    return item;
  }
}
