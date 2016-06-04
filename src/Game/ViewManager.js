import {defaults} from 'lodash';

const initial = {
  scale: 1,
  offset: {
    x: 0,
    y: 0
  }
};

export default class ViewManager{

  constructor(state) {
    if(!state){
      state = {};
    }
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
      this.state.offset.x += delta.x;
      this.state.offset.y += delta.y;
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
