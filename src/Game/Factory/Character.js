// @flow
import {defaults} from 'lodash';
import Point from 'Game/Point';
import config from 'Game/config';
import uniqid from 'Util/uniqid';


export type Char = {
  id:string,
  position: Point,
  firstname: string,
  lastname: string,
  action: ?Object,
  task: ?Object
}

const base:Char = {
  id:'uniqid',
  position: new Point(0,0),
  firstname: 'John',
  lastname: 'Doe',
  action: null,
  task: null
};


export default class CharacterFactory{
  static create(char:Object = {}):Char{
    if(config.env==='dev') validate(char);

    if(!char.id)
      char.id = uniqid();

    defaults(char, base);
    char.position = new Point(char.position);
    return char;
  }
}

export function validate(char:Object){
//throw errors and do nothing else
}
