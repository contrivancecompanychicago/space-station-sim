
import States from '../States';

export default {
  start: function(){},
  update: function(char){
    let task = this.taskManager.getTask(char.task);
    this.move(char, centerBlock(blockToPoint(task.block)), this.time.deltaTime*config.character.speed);
    if(atBlock(char, task.block)){
      task.progress += this.time.deltaTime;
      if(task.progress>=1){
        this.gridManager.addNode(task.block.x, task.block.y, task.grid);
        this.taskManager.finishTask(char.task);
        this.changeState(char, States.IDLE);
      }
    }
  },
  end: function(char){
    delete char.task;
  },
}
