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
  getUnassignedTask(){
    let tasks = keys(this.state);
    for(let i = 0; i < tasks.length; i++){
      let task = this.state[tasks[i]];
      if(!task.worker) return task;
    }
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
  // addTasks(selection, type){
  //   let sel = selection.rect.blockRect();
  //   for(let y = sel.t; y <= sel.b; y++){
  //     for(let x = sel.l; x <= sel.r; x++){
  //       this.addTask()
  //     }
  //   }
  // }

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

  update(){
    this.clean();
  }
  clean() {
    keys(this.state).forEach(key => {
      let task = this.state[key];
      let characterManager = this.getComponent('characterManager');
      if(task.worker){
        let char = characterManager.getChar(task.worker);
        if(char && char.task != task.id){
          delete task.worker;
        }
      }
    });
  }


}
