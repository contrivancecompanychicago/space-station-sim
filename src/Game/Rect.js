import {extend } from 'lodash';
import config from 'Game/config';

import {Block} from 'Game/Point';

export default class Rect{
  static screenRect(){
    let tl = Point.fromScreen(0,0);
    let br = Point.fromScreen(window.innerWidth,window.innerHeight);
    return new Rect(tl, br);
  }
  constructor(){
    // console.log(arguments);
    if(arguments.length === 4){
      this.t = arguments[0];
      this.r = arguments[1];
      this.b = arguments[2];
      this.l = arguments[3];
    }else if(arguments.length === 1){
      extend(this, arguments[0]);
    }else if(arguments.length === 2){
      let p1 = arguments[0];
      let p2 = arguments[1];
      if(p1.x<p2.x){
        this.l = p1.x;
        this.r = p2.x;
      }else{
        this.l = p2.x;
        this.r = p1.x;
      }
      if(p1.y<p2.y){
        this.t = p1.y;
        this.b = p2.y;
      }else{
        this.t = p2.y;
        this.b = p1.y;
      }

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
