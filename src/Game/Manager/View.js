import {defaults} from 'lodash';
import config from 'Game/config';


const MouseButtons = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2
};

const initial = {
  scale: 1,
  offset: {
    x: 0,
    y: 0
  },
};

export default class ViewManager{

  constructor(state = {}) {
    this.type = 'viewManager';
    this.state = defaults(state, initial);
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
    document.addEventListener('mousedown', this, false);
    document.addEventListener('mouseup', this, false);
    document.addEventListener('mousemove', this, false);
    document.addEventListener('mousewheel', this, false);
    document.addEventListener('DOMMouseScroll', this, false);
  }
  removeListeners() {
    document.removeEventListener('mousedown', this, false);
    document.removeEventListener('mouseup', this, false);
    document.removeEventListener('mousemove', this, false);
    document.removeEventListener('mousewheel', this, false);
    document.removeEventListener('DOMMouseScroll', this, false);
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
    if(e.button === 1){
      this.stopDrag();
    }else{
      this.endSelection(e);
    }
  }

  isMouseDown(button){
    return this.down[button];
  }

  onMouseMove(e) {
    if(this.dragging){
      let delta = {x:e.pageX-this.lastPos.x, y: e.pageY-this.lastPos.y};
      this.lastPos = {x:e.pageX, y: e.pageY};
      this.state.offset.x += delta.x / this.state.scale;
      this.state.offset.y += delta.y / this.state.scale;
    }else if(this.selecting){
      this.updateSelection(e);
    }
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
    this.startPos = this.pointToBlock(this.globalToLocal({x:e.pageX, y: e.pageY}));
  }

  updateSelection(e){
    this.endPos = this.pointToBlock(this.globalToLocal({x:e.pageX, y: e.pageY}));
    this.selection = {
      t: Math.min(this.endPos.y, this.startPos.y),
      r: Math.max(this.endPos.x, this.startPos.x),
      b: Math.max(this.endPos.y, this.startPos.y),
      l: Math.min(this.endPos.x, this.startPos.x),
    };
    this.state.selection = this.selection;
  }

  endSelection(e){
    this.selecting = false;
    this.updateSelection(e);
    this.state.selection = false;
    let grid = this.getComponent('gridManager');
    let pt = this.startPos;
    debugger;

    //////////////////HACK HACK HACK HACK HACK HACK HACK HACK
    for(let y = this.selection.t; y <= this.selection.b; y++){
      for(let x = this.selection.l; x <= this.selection.r; x++){
        // console.log(y)
        switch(e.button){
          case MouseButtons.LEFT:
            grid.addNode(x, y, 'basic');
            break;
          case MouseButtons.RIGHT:
            grid.removeNode(x, y);
            break;
        }

      }
    }

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
