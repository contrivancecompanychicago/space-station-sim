
import uniqid from 'Util/uniqid';
import {keys, defaults} from 'lodash';

import {blockToPoint, pointToBlock} from 'Util';

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
      y:0
    });
    this.state[char.id] = char;
  }

  update(time){
    keys(this.state).forEach((key) => {
      let char = this.state[key];
      if(!char.targetBlock){
        char.targetBlock = {
          x: Math.floor(Math.random()*20),
          y: Math.floor(Math.random()*20),
        };
        let gridManager = this.getComponent('gridManager');
        gridManager.addNode(char.targetBlock.x, char.targetBlock.y, 'plain');
      }
      let point = blockToPoint(char.targetBlock);
      point.x += 16;
      point.y += 16;
      this.move(char, point, time);
      let myBlock = pointToBlock(char);
      if(myBlock.x === char.targetBlock.x && myBlock.y === char.targetBlock.y){
        delete char.targetBlock;
      }
      // char.x += Math.random()-.5;
      // char.y += Math.random()-.5;
    });
  }
  move(char, target, time){
    let speed = 50 * time.deltaTime;
    const dir = Math.atan2(target.y - char.y, target.x-char.x);
    char.x += Math.cos(dir)*speed;
    char.y += Math.sin(dir)*speed;
  }

}
