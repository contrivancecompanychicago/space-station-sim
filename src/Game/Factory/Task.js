import {defaults} from 'lodash';

import {Tasks} from 'Game/Type/Task';

const base = {
  block: {
    x: 0,
    y: 0,
  },
  progress:0
};


export default class TaskFactory{
  static create(task = {}){
    //do some checking
    if(!task.block) throw new Error('task block not defined');
    if(!task.type) throw new Error('task type not defined');

    defaults(task, base);
    return task;
  }
}
