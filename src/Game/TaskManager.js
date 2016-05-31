import uniqid from 'Util/uniqid';

export default class TaskManager{
  constructor(state){
    this.type = 'taskManager';
    this.state = state;
  }

  getTask(id){
    return this.state[id];
  }

  addTask(task){
    if(!task.id) task.id = uniqid();
    this.state[task.id] = task;
    return task;
  }

}
