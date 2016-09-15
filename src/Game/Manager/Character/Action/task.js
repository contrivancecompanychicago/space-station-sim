import engine from 'Game/engine';
import moveToBlock from './moveToBlock';
import time from 'Game/time';

export default function* task(char){
  let taskManager = engine.getComponent('taskManager');
  let task = taskManager.getTask(char.task);
  // console.log(task);
  yield *moveToBlock(char, task.block);
  while(task.progress<1){
    task.progress += time.deltaTime;
    yield;
  }
  let gridManager = engine.getComponent('gridManager');
  gridManager.addNode(task.block.x, task.block.y, task.grid);
  taskManager.finishTask(char.task);
}
