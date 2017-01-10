
import {defaults} from 'lodash';
import Point from 'Game/Point';
import config from 'Game/config';
import uniqid from 'Util/uniqid';

type Item = {
  position: Point,
  type: string
}

const base:Item = {
  position: new Point(0,0),
  type: null
};

export default class ItemFactory{
  static create(item = {}){

    if(!item.id)
      item.id = uniqid();
    defaults(item, base);
    item.position = new Point(item.position);
    return item;
  }
}
