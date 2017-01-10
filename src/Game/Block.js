// @flow
import config from 'Game/config';
import Point from 'Game/Point';
import {makeKey} from 'Util';
import Rect from 'Game/Rect';

export default class Block{
  x:number;
  y:number
  constructor(pos:Object){
    this.x = pos.x;
    this.y = pos.y;
    if(arguments[1]){
      throw new Error('Block constructor takes an object');
    }
  }
  get center():Point{
    return new Point({
      x: (this.x+.5) * config.grid.width,
      y: (this.y+.5) * config.grid.height
    });
  }
  get point():Point{
    return new Point({
      x: this.x * config.grid.width,
      y: this.y * config.grid.height
    });
  }
  is(block:Block):boolean{
    return (block.x === this.x && block.y === this.y);
  }

  get rect():Rect{
    return new Rect({
      t: this.y * config.grid.height,
      r: (this.x + 1) * config.grid.width,
      b: (this.y + 1) * config.grid.height,
      l: this.x * config.grid.width
    });
  }

  get key():string{
    return makeKey(this.x, this.y);
  }
}
