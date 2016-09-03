//start update and end
export default {
  idle:{
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
    },
  },
  random:{
    start: function(char){
      this.makePath(char, this.gridManager.randomNode());
    },
    update: function(char){
      this.followPath(char);
    },
  },
  task:{
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
};
