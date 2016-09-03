
import States from '../States';
export default {
  update: function(char){
    let task = this.taskManager.getUnassignedTask();
    if(task){
      this.taskManager.assignTask(task.id, char.id);
      char.task = task.id;
      this.changeState(char, States.TASK);
    }
    if(Math.random()<0.01){
      this.changeState(char, States.RANDOM);
    }
  }
}
