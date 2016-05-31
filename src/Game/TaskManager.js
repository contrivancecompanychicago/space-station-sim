

export default class TaskManager{
  constructor(state){
    this.type = 'taskManager';
    this.state = state;
  }

  getTask(id){
    return this.state[id];
  }

  addTask(task){
    this.state[task.id] = task;
    return task;
  }

}
