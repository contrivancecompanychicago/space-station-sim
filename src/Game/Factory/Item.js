import {defaults} from 'lodash';
import Point from 'Game/Point';
import config from 'Game/config';
import uniqid from 'Util/uniqid';

const base = {
  position: {
    x: 0,
    y: 0
  }
};

export default class ItemFactory{
  static create(item = {}){
    if(config.env==='dev') validate(item);

    if(!item.id)
      item.id = uniqid();
    defaults(item, base);
    item.position = new Point(item.position);
    return item;
  }
}


export function validate(char){

}
