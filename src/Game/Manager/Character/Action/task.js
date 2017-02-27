// @flow
import engine from 'Game/engine';

import actions from './index'
import time from 'Game/time';

import type Character from 'Game/Type/Character';

import state from 'Game/state'

// import type TaskManager from 'Game/Manager/Task';

import Grid from 'Game/Type/Grid'

export default function* task(char:Character):Generator<*,*,*>{
  let task = char.getTask();
  if(task){
    yield *actions.moveToBlock(char, task.block);
    while(task.progress<1){
      task.progress += time.deltaTime;
      yield;
    }
    //resolve task

    state.grid.addNode(task.block.x, task.block.y, new Grid({type: task.grid, rotation:0}));
    state.task.finishTask(task.id);

  }
}
