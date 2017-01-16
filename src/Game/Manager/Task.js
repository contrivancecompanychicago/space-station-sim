// @flow
import {map, keys, head} from 'lodash';
import Task from 'Game/Type/Task'
import Character from 'Game/Type/Character'

import Component from 'Imagine/Component';

import type CharacterManager from 'Game/Manager/Character'

export default class TaskManager extends Component{
  state: Object;
  constructor(state:Object = {}){
    super();
    this.type = 'taskManager';
    this.state = state;
  }

  getTask(id:string){
    if(!id) id = head(keys(this.state));
    return this.state[id];
  }
  getUnassignedTask(){
    let tasks = keys(this.state);
    for(let i = 0; i < tasks.length; i++){
      let task = this.state[tasks[i]];
      if(!task.worker) return task;
    }
  }

  getNextTask(id:string){
    if(!id) throw new Error('wtf');
    let tasks = keys(this.state);
    id = tasks[tasks.indexOf(id.toString())+1];
    return this.getTask(id);
  }

  addTask(task:Task){
    // task = Factory.create(task);
    this.state[task.id] = task;
    return task;
  }
  // addTasks(selection, type){
  //   let sel = selection.rect.blockRect();
  //   for(let y = sel.t; y <= sel.b; y++){
  //     for(let x = sel.l; x <= sel.r; x++){
  //       this.addTask()
  //     }
  //   }
  // }

  assignTask(id:string, worker:string){
    if(this.state[id]){
      this.state[id].worker = worker;
    }
  }

  unassignTask(id:String){
    if(this.state[id]){
      delete this.state[id].worker;
    }
  }

  unassignTaskWorker(worker:Character){
    map(this.state, (val) =>{
      if(val.worker && val.worker === worker) delete val.worker;
      return val;
    });
  }

  finishTask(id:string){
    delete this.state[id];
  }

  update(){
    this.clean();
  }
  clean() {
    keys(this.state).forEach(key => {
      let task = this.state[key];
      let characterManager:characterManager = this.getComponent('characterManager');
      if(task.worker){
        let char = characterManager.getChar(task.worker);
        if(char && char.task != task.id){
          delete task.worker;
        }
      }
    });
  }


}
