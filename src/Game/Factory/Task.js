import {defaults} from 'lodash';

import {Tasks} from 'Game/Type/Task';

import {Block} from 'Game/Point';
import config from 'Game/config';

const base = {
  block: {
    x: 0,
    y: 0,
  },
  progress:0,
};


export default class TaskFactory{
  static create(task = {}){
    if(config.env==='dev') validate(task);

    defaults(task, base);
    task.block = new Block(task.block);
    return task;
  }
}


export function validate(task){
  //do some checking
  if(!task.block) throw new Error('task block not defined');
  if(!task.type) throw new Error('task type not defined');
}
