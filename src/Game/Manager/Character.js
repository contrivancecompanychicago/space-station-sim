
import uniqid from 'Util/uniqid';
import {keys, defaults} from 'lodash';

import config from 'Game/config';

import {blockToPoint, pointToBlock} from 'Util';

const States = {
  IDLE:'idle',
  RANDOM: 'random'
};
const State = {
  idle:{
    start: (char) => {

    },
    update: (char) => {
      this.changeState(char, States.RANDOM);
    },
    stop: (char) => {

    }
  },
  random:{
    start: (char) => {
      this.makePath(char, this.gridManager.randomNode());
    },
    update: (char) => {
      this.followPath(char);
    },
    stop: (char) => {

    }
  }
};

export default class Character{
  constructor(state){
    this.type = 'characterManager';
    this.state = state;
    // this.addChar({name: 'billy'});
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
    let current = State[char.state];
    let next = State[newState];
    current.stop(char);
    char.state = newState;
    next.start(char);
  }

  update(time){
    this.time = time;
    this.gridManager = this.getComponent('gridManager');
    keys(this.state).forEach((key) => {
      let char = this.state[key];
      let state = State[char.state];
      // state.update(char).bind(this);
      this.followPath(char);

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
      // this.changeState(States.IDLE).bind(this);
      this.makePath(char, this.gridManager.randomNode());

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
    // let target = gridManager.randomNode();
    let currentBlock = pointToBlock(char);
    char.path = this.gridManager.getPath(currentBlock, target);
  }
  move(char, target, amount){
    const dir = Math.atan2(target.y - char.y, target.x-char.x);
    char.x += Math.cos(dir)*amount;
    char.y += Math.sin(dir)*amount;
  }

}
