// @flow
import {defaults} from 'lodash';
import config from 'Game/config';

import Point from 'Game/Point';

import MouseButtons from 'Util/MouseButtons';

import Rect from 'Game/Rect';

import type {Selection} from 'Game/Type/Selection'

// import dispatcher from 'Game/Action/Dispatcher'

import type Character from 'Game/Type/Character'

import state from 'Game/state'

type Event = {
  wheelDelta:number,
  pageX:number,
  pageY:number,
  button:number,
  type: string,
  detail:number
}

export type ViewState = {
  offset: {x:number, y:number},
  mousePosition: Point,
  scale: number,
  selection: ?Selection,
}

const initial:ViewState = {
  scale: 1,
  mousePosition:new Point({x:0, y:0}),
  offset: {
    x: 0,
    y: 0
  },
  selection:null
};


export default class ViewModel{


  // ADD ABILITY TO ADD LISTENER TO BREAK DEPS ON DISPATCHER
  listeners:Array<Function>
  subscribe(func:Function){
    this.listeners.push(func)
  }

  type: string;
  state: ViewState;

  // container: Object;
  dragging: boolean;
  down: {[id:number]:boolean};
  selection: Selection;
  selecting: boolean;
  startPos: Point;
  endPos: Point;
  lastPos: {x:number, y:number};
  button: number;

  follow:?Character;


//   update(){
//     //calculate whats under mousey
//     // let charManager = getCharacterManager();
//     // let char = charManager.getClosestCharacterToPoint(this.state.mousePosition);
//     if(this.follow){
//       this.centerOnPoint(this.follow.position.rounded);
//     }

//   }
  constructor(state:ViewState = initial){//, container:HTMLElement) {
    this.state = state
    this.listeners = []
    //defaults(state, initial); //WHYYY
    this.dragging = false;
    this.down = {};
  }
  init(){
    // console.log('"INIT CALLED');
    
    // let container = window.game.container; //HACK
    // this.container = container.getElementsByTagName('canvas')[0];
  }
  centerOnPoint(point:Point){
    //HACK TODO
    this.state.offset.x = 400-point.x
    this.state.offset.y = 400-point.y
    
  }

  followCharacter(char:Character){
    this.follow = char
  }
  unfollowCharacter(){
    this.follow = null
  }
  

  getMousePoint():Point{
    return new Point(this.state.mousePosition);
  }

  globalToLocal(point:Object){
    return {
      x: (point.x / this.state.scale) - this.state.offset.x,
      y: (point.y / this.state.scale) - this.state.offset.y
    };
  }

  localToGlobal(point:Object){
    return {
      x: (this.state.offset.x + (point.x)) * this.state.scale,
      y: (this.state.offset.y + (point.y)) * this.state.scale,
    };
  }


  zoom(out:boolean, point:Point){
    let start = this.globalToLocal(point); //TODO: use point methods
    if(out){
      this.state.scale += config.view.scale.step;
      this.state.scale = Math.min(this.state.scale, config.view.scale.max);
    }else{ //in
      this.state.scale -= config.view.scale.step;
      this.state.scale = Math.max(this.state.scale, config.view.scale.min);
    }
    let end = this.globalToLocal(point); //TODO: use point methods
    //reposition to cursor
    this.state.offset.x += end.x - start.x;
    this.state.offset.y += end.y - start.y;
  }

  startDrag(e:Event){
    this.dragging = true;
    this.follow = null;
    this.lastPos = {x:e.pageX, y: e.pageY};
  }

  stopDrag(){
    this.dragging = false;
  }

  startSelection(e:Event){
    this.selecting = true;
    this.startPos = Point.fromScreen(e.pageX, e.pageY);
    this.selection = selection(this.startPos, this.startPos, e.button)
    this.button = e.button;
  }

  updateSelection(e:Event){
    this.endPos = Point.fromScreen(e.pageX, e.pageY);
    this.selection = selection(this.startPos, this.endPos, this.button);
    this.state.selection = this.selection;
  }

  endSelection(e:Event){
    this.selecting = false;
    this.updateSelection(e);
    // dispatcher.userAction(this.selection)
    this.listeners.forEach(f =>{
      f.call(null, this.selection);
    })
    this.state.selection = null;

  }

  mouseMove(e:Event) {
    let point = Point.fromScreen(e.pageX, e.pageY);
    if(this.dragging){
      
      let delta = {x:e.pageX-this.lastPos.x, y: e.pageY-this.lastPos.y};
      this.lastPos = {x: e.pageX, y:e.pageY};
      this.state.offset.x += delta.x / this.state.scale;
      this.state.offset.y += delta.y / this.state.scale;
    }else if(this.selecting){
      this.updateSelection(e);
    }
    this.state.mousePosition = point;
  }

  pointToBlock(point:Point):{x:number, y:number} {
    return {
      x: Math.floor(point.x/config.grid.width),
      y: Math.floor(point.y/config.grid.height),
    };
  }

  // destroy(){
  //   this.removeListeners();
  // }
  get scale():number{
    return this.state.scale
  }

}



export function selection(start:Object, end:Object, button:number):Selection{
  return {
    start: start,
    end: end,
    button: button,
    // rect: new Rect({
    //   t: Math.min(end.y, start.y),
    //   r: Math.max(end.x, start.x),
    //   b: Math.max(end.y, start.y),
    //   l: Math.min(end.x, start.x),
    // })
    rect: new Rect(start, end)
  }
}
