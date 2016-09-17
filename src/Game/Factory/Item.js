import defaults from 'lodash.defaults';
import Point from 'Game/Point';

const base = {
  block: {
    x: 0,
    y: 0
  }
};


export default class ItemFactory{
  static create(item = {}){
    defaults(item, base);
    item.position = new Point(item.position);
    return item;
  }
}
