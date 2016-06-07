import {defaults} from 'lodash';

const initial = {
  scale: 1,
  offset: {
    x: 0,
    y: 0
  }
};

export default class ViewManager{

  constructor(state = {}) {
    this.state = defaults(state, initial);
    this.dragging = false;
  }

  start(){
    this.addListeners();
  }

  addListeners() {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mousewheel', this.onMouseScroll.bind(this));
    document.addEventListener('DOMMouseScroll', this.onMouseScroll.bind(this));
  }

  globalToLocal(point){
    return {
      x: ((point.x / this.state.scale) - this.state.offset.x),
      y: ((point.y / this.state.scale) - this.state.offset.y)
    };
  }
  localToGlobal(point){
    return {
      x: (this.state.offset.x + (point.x)) * this.state.scale,
      y: (this.state.offset.y + (point.y)) * this.state.scale,
    };
  }


  onMouseDown(e){
    if(e.button === 1){
      this.startDrag(e);
    }
  }
  onMouseUp(e){
    if(e.button === 1){
      this.stopDrag();
    }
  }
  onMouseMove(e) {
    if(this.dragging){
      let delta = {x:e.pageX-this.lastPos.x, y: e.pageY-this.lastPos.y};
      this.lastPos = {x:e.pageX, y: e.pageY};
      this.state.offset.x -= delta.x;
      this.state.offset.y -= delta.y;
    }
  }

  onMouseScroll(e){
    let d = e.wheelDelta;
    if(!d) d = -e.detail;
    this.zoom(d>0);
  }

  zoom(out){
    if(out){
      this.state.scale += 0.1;
    }else{ //in
      this.state.scale -= 0.1;
    }
  }

  startDrag(e){
    this.dragging = true;
    this.lastPos = {x:e.pageX, y: e.pageY};
  }

  stopDrag(){
    this.dragging = false;
  }

}
