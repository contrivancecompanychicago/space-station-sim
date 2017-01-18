// @flow
import {keys, defaults} from 'lodash';

import config from 'Game/config';
import actions from 'Game/Manager/Character/Action';


import Character from 'Game/Type/Character';

import Component from 'Imagine/Component';

import type TaskManager from 'Game/Manager/Task';

import type {CharacterState} from 'Game/state'

export default class CharacterManager extends Component{
  // type:string;
  state: CharacterState;
  taskManager:TaskManager;
  constructor(state:CharacterState){
    super();
    this.type = 'characterManager';
    this.state = state;
  }

  addChar(char:Character){
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

  newAction(char:Character){
    if(!this.taskManager){
      this.taskManager = (this.getComponent('taskManager'):any);
    }
    let task = this.taskManager.getUnassignedTask();
    if(task){
      this.taskManager.assignTask(task.id, char.id);
      char.task = task.id;
      char.action = actions.task(char);
      return;
    }
    //

    switch(char.type){
      case 'COOK':
        char.action = actions.cook(char);
        break;
      case 'WAITER':
        char.action = actions.waiter(char);
        break;
      default:
        char.action = actions.wander(char);
    }
  }

  getChar(id:string):Character{
    return this.state[id];
  }

}
