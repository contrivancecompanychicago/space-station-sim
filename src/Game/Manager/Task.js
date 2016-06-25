import uniqid from 'Util/uniqid';
import {map, keys, head} from 'lodash';


export default class TaskManager{
  constructor(state = {}){
    this.type = 'taskManager';
    this.state = state;
  }

  getTask(id){
    if(!id) id = head(keys(this.state));
    return this.state[id];
  }

  getNextTask(id){
    if(!id) throw new Error('wtf');
    let tasks = keys(this.state);
    id = tasks[tasks.indexOf(id.toString())+1];
    return this.getTask(id);
  }

  addTask(task){
    if(!task.id) task.id = uniqid();
    this.state[task.id] = task;
    return task;
  }

  assignTask(id, worker){
    if(this.state[id]){
      this.state[id].worker = worker;
    }
  }

  unassignTask(id){
    if(this.state[id]){
      delete this.state[id].worker;
    }
  }

  unassignTaskWorker(worker){
    map(this.state, (val) =>{
      if(val.worker && val.worker === worker) delete val.worker;
      return val;
    });
  }

  finishTask(id){
    delete this.state[id];
  }


}
