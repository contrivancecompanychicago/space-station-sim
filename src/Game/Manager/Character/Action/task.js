// @flow
import engine from 'Game/engine';

import moveToBlock from './moveToBlock';
import time from 'Game/time';

import type Character from 'Game/Type/Character';

import type TaskManager from 'Game/Manager/Task';

export default function* task(char:Character):Generator<*,*,*>{
  let taskManager:TaskManager = (engine.getComponent('taskManager'):any);
  let task = taskManager.getTask(char.task);
  yield *moveToBlock(char, task.block);
  while(task.progress<1){
    task.progress += time.deltaTime;
    yield;
  }
  let gridManager = engine.getComponent('gridManager');
  //resolve task

  gridManager.addNode(task.block.x, task.block.y, task.grid);
  taskManager.finishTask(char.task);
}
