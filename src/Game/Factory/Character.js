import {defaults} from 'lodash';

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
    defaults(char, base);
    return char;
  }
}
