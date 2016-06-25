
import uniqid from 'Util/uniqid';
import {keys, defaults} from 'lodash';

import config from 'Game/config';

import {blockToPoint, pointToBlock} from 'Util';

const States = {
  IDLE:'idle',
  RANDOM: 'random',
  TASK: 'task'
};
const State = {
  idle:{
    start: function(char){

    },
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
    stop: function(char){

    }
  },
  random:{
    start: function(char){
      this.makePath(char, this.gridManager.randomNode());
    },
    update: function(char){
      this.followPath(char);
    },
    stop: function(char){

    }
  },
  task:{
    start: function(){},
    update: function(char){
      let task = this.taskManager.getTask(char.task);
      this.move(char, this.centerBlock(blockToPoint(task.block)), 1);
      if(this.atBlock(char, task.block)){
        this.gridManager.addNode(task.block.x, task.block.y, task.grid);
        // console.log("node");
        this.taskManager.finishTask(char.task);
        this.changeState(char, States.IDLE);
      }
    },
    stop: function(char){
      delete char.task;
    },
  }
};

export default class Character{
  constructor(state){
    this.type = 'characterManager';
    this.state = state;
    this.bindStates();
  }
  bindStates() {
    keys(State).forEach((k) => {
      keys(State[k]).forEach((s) => {
        State[k][s] = State[k][s].bind(this);
      });
    });
  }

  addChar(char){
    if(!char.id)
      char.id = uniqid();
    defaults(char, {
      x:0,
      y:0,
      path: [],
      state: States.IDLE
    });
    this.state[char.id] = char;
  }

  changeState(char, newState) {
    // console.log(char, 'to', newState);
    let current = State[char.state];
    let next = State[newState];
    // console.log(char.state, current);
    current.stop(char);
    char.state = newState;
    next.start(char);
  }

  update(time){
    this.time = time;
    this.gridManager = this.getComponent('gridManager');
    this.taskManager = this.getComponent('taskManager');
    keys(this.state).forEach((key) => {
      let char = this.state[key];
      let state = State[char.state];
      state.update(char);
    });
  }
  followPath(char){
    if(char.targetBlock){
      let point = this.centerBlock(blockToPoint(char.targetBlock));
      this.move(char, point, 50 * this.time.deltaTime);
      if(this.atBlock(char, char.targetBlock)){
        delete char.targetBlock;
      }
    }else if(char.path.length>0){
      char.targetBlock = char.path.shift();
    }else{
      this.changeState(char, States.IDLE);
      // this.makePath(char, this.gridManager.randomNode());

    }
  }
  centerBlock(block){
    return {
      x: block.x + 16,
      y: block.y + 16
    };
  }
  atBlock (char, target){
    let myBlock = pointToBlock(char);
    return (myBlock.x === target.x && myBlock.y === target.y);
  }
  makePath(char, target){
    let currentBlock = pointToBlock(char);
    char.path = this.gridManager.getPath(currentBlock, target);
  }
  move(char, target, amount){
    const dir = Math.atan2(target.y - char.y, target.x-char.x);
    char.x += Math.cos(dir)*amount;
    char.y += Math.sin(dir)*amount;
  }

}
