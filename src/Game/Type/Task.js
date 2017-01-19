//@flow

import {defaults} from 'lodash';
import type Point from 'Game/Point';
import uniqid from 'Util/uniqid';
import Block from 'Game/Block';
import type Character from 'Game/Type/Character'
import type {TaskType} from 'Game/Data/Task'
import type {GridType} from 'Game/Data/Grid'

export default class Task{
  block:Block;
  type: TaskType;
  progress: number;
  id: string;
  grid:GridType;
  worker: ?string; //ID
  constructor(params:{type:TaskType, block:Block, grid:GridType}){
    defaults(this, params);
    if(!this.progress) this.progress = 0;
    if(!this.id) this.id = uniqid();
  }
}
