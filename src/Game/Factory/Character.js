import {defaults} from 'lodash';
import Point from 'Game/Point';
import config from 'Game/config';
import uniqid from 'Util/uniqid';
const base = {
  position:{
    x: 0,
    y: 0
  },
  firstname: 'John',
  lastname: 'Doe'
};


export default class CharacterFactory{
  static create(char = {}){
    if(config.env==='dev') validate(char);

    if(!char.id)
      char.id = uniqid();

    defaults(char, base);
    char.position = new Point(char.position);
    return char;
  }
}

export function validate(char){

}
