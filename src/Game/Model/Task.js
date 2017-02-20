// @flow
import {map, keys, head} from 'lodash';
import state from 'Game/state'

import Task from 'Game/Type/Task'
import type Character from 'Game/Type/Character'



export type TaskState = {
  [id:string]: Task
}

export default class TaskModel{

  state: TaskState;
  constructor(state:TaskState = {}){
    this.state = state;
  }

  getTask(id:string):Task{
    if(!id) id = head(keys(this.state));
    return this.state[id];
  }
  getUnassignedTask():Task|void{
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
    this.state[task.id] = task;
    return task;
  }

  assignTask(id:string, worker:string){
    if(this.state[id]){
      this.state[id].worker = worker;
    }
  }

  unassignTask(id:string){
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
      
      if(task.worker){
        let char = state.character.getChar(task.worker);
        if(char && char.task != task.id){
          delete task.worker;
        }
      }
    });
  }


}
