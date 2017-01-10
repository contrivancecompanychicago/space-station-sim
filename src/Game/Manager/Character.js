// @flow
import {keys, defaults} from 'lodash';

import config from 'Game/config';
import actions from 'Game/Manager/Character/Action';

import Factory from 'Game/Factory/Character';

import Character from 'Game/Type/Character';


export default class CharacterManager{
  type:string;
  state: Object;
  taskManager:Object;
  getComponent: Function;
  constructor(state:Object){
    this.type = 'characterManager';
    this.state = state;
  }

  addChar(char:Character){

    // char = new Character(char); //TODO: remove this line

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

  getChar(id:string):Character{
    return this.state[id];
  }

}
