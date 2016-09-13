import {extend } from 'lodash';
import config from 'Game/config';

import {Block} from 'Game/Point';

export default class Rect{
  constructor(){
    // console.log(arguments);
    if(arguments.length === 4){
      this.t = arguments[0];
      this.r = arguments[1];
      this.b = arguments[2];
      this.l = arguments[3];
    }else{
      extend(this, arguments[0]);
    }
  }
  blockRect(){
    return new Rect(
      Math.floor(this.t/config.grid.height),
      Math.floor(this.r/config.grid.width),
      Math.floor(this.b/config.grid.width),
      Math.floor(this.l/config.grid.height)
    );
  }
  get blocks(){
    let list = [];
    let sel = this.blockRect();
    for(let y = sel.t; y <= sel.b; y++){
      for(let x = sel.l; x <= sel.r; x++){
        list.push(new Block({x,y}));
      }
    }
    return list;
  }
}
