import {defaults} from 'lodash';
import Point from 'Game/Point';
import config from 'Game/config';

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
    defaults(char, base);
    char.position = new Point(char.position);
    return char;
  }
}

export function validate(char){

}
