
import uniqid from 'Util/uniqid';
import {keys, defaults} from 'lodash';

import config from 'Game/config';

import {blockToPoint, pointToBlock, blockToCenter, pointAtBlock} from 'Util';

import State from './Character/State'

function centerBlock(block){
  return {
    x: block.x + 16,
    y: block.y + 16
  };
}
function atBlock (char, target){
  let myBlock = pointToBlock(char);
  return (myBlock.x === target.x && myBlock.y === target.y);
}

const States = {
  IDLE:'idle',
  RANDOM: 'random',
  TASK: 'task'
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
    if(current.end) current.end(char);
    char.state = newState;
    if(next.start) next.start(char);
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
      let point = centerBlock(blockToPoint(char.targetBlock));
      this.move(char, point, config.character.speed * this.time.deltaTime);
      if(atBlock(char, char.targetBlock)){
        delete char.targetBlock;
      }
    }else if(char.path.length>0){
      char.targetBlock = char.path.shift();
    }else{
      this.changeState(char, States.IDLE);
      // this.makePath(char, this.gridManager.randomNode());

    }
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

  getChar(id){
    return this.state[id];
  }

}
