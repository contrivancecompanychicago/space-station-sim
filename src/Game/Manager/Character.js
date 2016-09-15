
import uniqid from 'Util/uniqid';
import {keys, defaults} from 'lodash';

import config from 'Game/config';

import State from './Character/State';

import actions from 'Game/Manager/Character/Action';



export default class Character{
  constructor(state){
    this.type = 'characterManager';
    this.state = state;
  }


  addChar(char){
    if(!char.id)
      char.id = uniqid();
    defaults(char, {
      position:{
        x: 0,
        y: 0
      },
      path: [],
    });
    this.state[char.id] = char;
  }



  update(time){
    this.time = time;
    this.gridManager = this.getComponent('gridManager');
    this.taskManager = this.getComponent('taskManager');
    keys(this.state).forEach((key) => {
      let char = this.state[key];
      if(!char.action){
        this.newAction(char);
      }
      if(char.action.next().done){
        this.newAction(char);
      }
      // let state = State[char.state];
      // state.update(char);
    });
  }

  newAction(char){
    // let action = actions.wander;
    let task = this.taskManager.getUnassignedTask();
    if(task){
      this.taskManager.assignTask(task.id, char.id);
      char.task = task.id;
      char.action = actions.task(char);
      return;
    }
    char.action = actions.wander(char);
  }



  getChar(id){
    return this.state[id];
  }

}
