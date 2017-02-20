// @flow
import engine from 'Game/engine';

import actions from './index'
import time from 'Game/time';

import type Character from 'Game/Type/Character';

// import type TaskManager from 'Game/Manager/Task';

import state from 'Game/state'
import Grid from 'Game/Type/Grid'

export default function* task(char:Character):Generator<*,*,*>{
  // let taskManager:TaskManager = (engine.getComponent('taskManager'):any);
  let taskManager = state.task
  let task = taskManager.getTask(char.task);
  yield *actions.moveToBlock(char, task.block);
  while(task.progress<1){
    task.progress += time.deltaTime;
    yield;
  }
  let gridManager = engine.getComponent('gridManager');
  //resolve task

  gridManager.addNode(task.block.x, task.block.y, new Grid({type: task.grid, rotation:0}));
  taskManager.finishTask(char.task);
}
