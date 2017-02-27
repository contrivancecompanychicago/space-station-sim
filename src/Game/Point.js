// @flow
/*
eases use of the points system
points stored in ingame coordinates
*/
import config from 'Game/config';
import Block from 'Game/Block';
import type {State} from 'Game/state'


export function screenToWorld(point:{x:number, y:number}, state:State): {x:number, y:number}{
  return {
    x: (point.x / state.view.state.scale) - state.view.state.offset.x,
    y: (point.y / state.view.state.scale) - state.view.state.offset.y
  };
}
export function worldToScreen(point:{x:number, y:number}, state:State):{x:number, y:number}{
  return {
    x: (state.view.state.offset.x + (point.x)) * state.view.state.scale,
    y: (state.view.state.offset.y + (point.y)) * state.view.state.scale,
  };
}


let state:State

export default class Point{
  x:number;
  y:number;
  state:State;
  static registerState(s:State): void{
    state = s
  }
  constructor(pos:{x:number, y:number}): void{
    this.x = pos.x;
    this.y = pos.y;
  }

  get screen():{x:number, y:number}{
    if(!state) throw new Error('Point state not registered')
    return worldToScreen({x:this.x, y:this.y}, state);
  }

  get block():Block {
    let pos = {
      x: Math.floor(this.x / config.grid.width),
      y: Math.floor(this.y / config.grid.height)
    }
    let b:Block = new Block(pos);
    return b;
  }

  static fromScreen(x:number,y:number):Point{
    if(!state) throw new Error('Point state not registered')
    let pos: {x: number, y: number} = screenToWorld({x,y}, state);
    return new Point(pos);
  }

  get rounded():Point{
    return new Point({
      x: Math.round(this.x),
      y: Math.round(this.y)
    })
  }
}