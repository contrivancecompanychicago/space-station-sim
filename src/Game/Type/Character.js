// @flow

import type Point from 'Game/Point';
import {defaults} from 'lodash';
import uniqid from 'Util/uniqid';

import type {CharacterType} from 'Game/Data/Character'

export default class Character{
  id: string;
  type:CharacterType;
  position: Point;
  firstname: string;
  lastname: string;
  action: ?Object;
  item: ?Object
  task: string;
  constructor(params:{type:CharacterType, position:Point}){
    defaults(this, params);
    if(!this.id) this.id = uniqid();
  }
}
