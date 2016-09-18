import defaults from 'lodash.defaults';
import Point from 'Game/Point';
import config from 'Game/config';

const base = {
  position: {
    x: 0,
    y: 0
  }
};

export default class ItemFactory{
  static create(item = {}){
    if(config.env==='dev') validate(item);
    defaults(item, base);
    item.position = new Point(item.position);
    return item;
  }
}


export function validate(char){

}
