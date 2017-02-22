// @flow
/*
eases use of the points system
points stored in ingame coordinates
*/
import config from 'Game/config';

import worldToScreen from 'Util/worldToScreen'
import screenToWorld from 'Util/screenToWorld'

import type {State} from 'Game/state'

import Block from 'Game/Block';


const dev = true;

let state:State

export default class Point{
  x:number;
  y:number;
  state:State;
  static registerState(s:State){
    state = s
  }
  constructor(pos:{x:number, y:number}){
    this.x = pos.x;
    this.y = pos.y;
  }

  get screen():Point{
    return worldToScreen({x:this.x, y:this.y}, state);
  }

  get block():Block {
    let b:Block = new Block({
      x: Math.floor(this.x / config.grid.width),
      y: Math.floor(this.y / config.grid.height)
    })
    return b;
  }

  static fromScreen(x:number,y:number):Point{
    let pos = screenToWorld({x,y}, state);
    return new Point(pos);
  }

  get rounded():Point{
    return new Point({
      x: Math.round(this.x),
      y: Math.round(this.y)
    })
  }

}
