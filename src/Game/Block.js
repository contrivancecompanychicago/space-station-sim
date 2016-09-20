
import config from 'Game/config';
import Point from 'Game/Point';
import {makeKey} from 'Util';

export default class Block{
  constructor(pos){
    this.x = pos.x;
    this.y = pos.y;
    if(arguments[1]){
      throw new Error('Block constructor takes an object');
    }
  }
  get center(){
    return new Point({
      x: (this.x+.5) * config.grid.width,
      y: (this.y+.5) * config.grid.height
    });
  }
  get point(){
    return new Point({
      x: this.x * config.grid.width,
      y: this.y * config.grid.height
    });
  }
  is(block){
    return (block.x === this.x && block.y === this.y);
  }

  get key(){
    return makeKey(this.x, this.y);
  }
}
