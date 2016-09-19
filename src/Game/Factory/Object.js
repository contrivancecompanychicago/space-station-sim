import {defaults} from 'lodash';
import Block from 'Game/Block';
import config from 'Game/config';

const base = {
  block: {
    x: 0,
    y: 0
  }
};

export default class ObjectFactory{
  static create(object = {}){
    if(config.env==='dev') validate(object);
    defaults(object, base);
    object.block = new Block(object.position);
    return object;
  }
}


export function validate(object){

}
