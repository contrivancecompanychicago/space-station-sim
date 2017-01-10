// @flow
import {keys, defaults} from 'lodash';

import config from 'Game/config';
import actions from 'Game/Manager/Character/Action';

import Factory from 'Game/Factory/Character';

import type {Char} from 'Game/Factory/Character';


export default class Character{
  type:string;
  state: Object;
  taskManager:Object;
  getComponent: function;
  constructor(state:Object){
    this.type = 'characterManager';
    this.state = state;
  }

  addChar(char:Object){
    char = Factory.create(char);
    this.state[char.id] = char;
  }

  update(){
    keys(this.state).forEach((key) => {
      let char = this.state[key];
      if(!char.action){
        this.newAction(char);
      }
      if(char.action.next().done){ ///CALLS NEXT HERE
        this.newAction(char);
      }
    });
  }

  newAction(char:Char){
    this.taskManager = this.getComponent('taskManager');
    let task = this.taskManager.getUnassignedTask();
    if(task){
      this.taskManager.assignTask(task.id, char.id);
      char.task = task.id;
      char.action = actions.task(char);
      return;
    }
    char.action = actions.wander(char);
  }

  getChar(id:string):Char{
    return this.state[id];
  }

}
