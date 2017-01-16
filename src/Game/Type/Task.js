//@flow

import {defaults} from 'lodash';
import type Point from 'Game/Point';
import uniqid from 'Util/uniqid';
import Block from 'Game/Block';
import type Character from 'Game/Type/Character'


export default class Task{
  block:Block;
  type: string;
  progress: number;
  id: string;
  grid:string;
  worker: ?string; //ID
  constructor(params:Object){
    defaults(this, params);
    if(!this.progress) this.progress = 0;
    if(!this.id) this.id = uniqid();
  }
}
