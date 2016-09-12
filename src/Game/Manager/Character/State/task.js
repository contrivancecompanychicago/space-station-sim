
import States from '../States';
import {blockToPoint, pointToBlock, blockToCenter, pointAtBlock} from 'Util';
import config from 'Game/config';
function centerBlock(block){
  return {
    x: block.x + 16,
    y: block.y + 16
  };
}
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
