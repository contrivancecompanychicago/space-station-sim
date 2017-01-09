import {defaults} from 'lodash';
import config from 'Game/config';

import Point from 'Game/Point';

import MouseButtons from 'Util/MouseButtons';

import Rect from 'Game/Rect';

const initial = {
  scale: 1,
  mousePosition:{
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
};

export default class ViewManager{

  constructor(state = {}, container) {
    this.type = 'viewManager';
    this.state = defaults(state, initial);
    this.container = container.getElementsByTagName('canvas')[0];
    this.dragging = false;
    this.down = {};
  }

  globalToLocal(point){
    return {
      x: (point.x / this.state.scale) - this.state.offset.x,
      y: (point.y / this.state.scale) - this.state.offset.y
    };
  }

  localToGlobal(point){
    return {
      x: (this.state.offset.x + (point.x)) * this.state.scale,
      y: (this.state.offset.y + (point.y)) * this.state.scale,
    };
  }

  start(){
    this.addListeners();
  }

  addListeners() {
    // console.log(this.container);
    // const canvas = this.container.getElementsByTagName('canvas')[0];
    // console.log(this.container.getElementsByTagName('canvas'));
    this.container.addEventListener('mousedown', this, false);
    this.container.addEventListener('mouseup', this, false);
    this.container.addEventListener('mousemove', this, false);
    this.container.addEventListener('mousewheel', this, false);
    this.container.addEventListener('DOMMouseScroll', this, false);
  }
  removeListeners() {
  // const canvas = this.container.getElementsByTagName('canvas')[0];
    this.container.removeEventListener('mousedown', this, false);
    this.container.removeEventListener('mouseup', this, false);
    this.container.removeEventListener('mousemove', this, false);
    this.container.removeEventListener('mousewheel', this, false);
    this.container.removeEventListener('DOMMouseScroll', this, false);
  }
  handleEvent(e) {
    switch(e.type){
      case 'mousedown':
        this.onMouseDown(e);
        break;
      case 'mouseup':
        this.onMouseUp(e);
        break;
      case 'mousemove':
        this.onMouseMove(e);
        break;
      case 'mousewheel':
        this.onMouseWheel(e);
        break;
      case 'DOMMouseScroll':
        this.onMouseWheel(e);
        break;
    }
  }


  onMouseDown(e){
    this.down[e.button] = true;
    if(e.button === 1){
      this.startDrag(e);
    }else{
      this.startSelection(e);
    }
  }

  onMouseUp(e){
    this.down[e.button] = false;
    if(e.button === MouseButtons.MIDDLE){
      this.stopDrag();
    }else{
      this.endSelection(e);
    }
  }

  isMouseDown(button){
    return this.down[button];
  }

  onMouseMove(e) {
    let point = Point.fromScreen(e.pageX, e.pageY);
    if(this.dragging){
      let delta = {x:e.pageX-this.lastPos.x, y: e.pageY-this.lastPos.y};
      this.lastPos = point;
      this.state.offset.x += delta.x / this.state.scale;
      this.state.offset.y += delta.y / this.state.scale;
    }else if(this.selecting){
      this.updateSelection(e);
    }
    this.state.mousePosition = point;
  }

  onMouseWheel(e){
    let d = e.wheelDelta;
    if(!d) d = -e.detail;
    this.zoom(d>0, e);
  }

  zoom(out, point){
    let start = this.globalToLocal(point);
    if(out){
      this.state.scale += config.view.scale.step;
      this.state.scale = Math.min(this.state.scale, config.view.scale.max);
    }else{ //in
      this.state.scale -= config.view.scale.step;
      this.state.scale = Math.max(this.state.scale, config.view.scale.min);
    }
    let end = this.globalToLocal(point);
    //reposition to cursor
    this.state.offset.x += end.x - start.x;
    this.state.offset.y += end.y - start.y;
  }

  startDrag(e){
    this.dragging = true;
    this.lastPos = {x:e.pageX, y: e.pageY};
  }

  stopDrag(){
    this.dragging = false;
  }

  startSelection(e){
    this.selecting = true;
    // this.startPos = this.globalToLocal({x:e.pageX, y: e.pageY});
    this.startPos = Point.fromScreen(e.pageX, e.pageY);

    this.selection = {start: this.startPos, button: e.button};
    this.button = e.button;
    // console.log(this.startPos, e);
  }

  updateSelection(e){
    // debugger;

    this.endPos = Point.fromScreen(e.pageX, e.pageY);
    // this.selection.rect = new Rect({
    //   t: Math.min(this.endPos.y, this.startPos.y),
    //   r: Math.max(this.endPos.x, this.startPos.x),
    //   b: Math.max(this.endPos.y, this.startPos.y),
    //   l: Math.min(this.endPos.x, this.startPos.x),
    // });
    // this.state.selection = this.selection;
    // this.state.selection.end = this.endPos;
    this.selection = selection(this.startPos, this.endPos);
    this.selection.button = this.button;
    this.state.selection = this.selection;
    // console.log(this.state.selection);
  }

  endSelection(e){
    this.selecting = false;
    this.updateSelection(e);
    this.notify('userAction', this.selection);
    this.state.selection = false;

  }
  pointToBlock(point) {
    return {
      x: Math.floor(point.x/config.grid.width),
      y: Math.floor(point.y/config.grid.height),
    };
  }

  destroy(){
    this.removeListeners();
  }


}

export function selection(start, end){
  let out = {start, end};
  out.rect = new Rect({
    t: Math.min(end.y, start.y),
    r: Math.max(end.x, start.x),
    b: Math.max(end.y, start.y),
    l: Math.min(end.x, start.x),
  });
  return out;
}
