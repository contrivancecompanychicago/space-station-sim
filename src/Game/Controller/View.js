// @flow
import {defaults} from 'lodash';
import config from 'Game/config';

import Point from 'Game/Point';

import MouseButtons from 'Util/MouseButtons';

import Rect from 'Game/Rect';

import type {Selection} from 'Game/Type/Selection'

import {getCharacterManager} from 'Game/engine'

import type Character from 'Game/Type/Character'
import state from 'Game/state'

export default class ViewController{

  container:Object
  constructor(container:HTMLElement){
    this.container = container.getElementsByTagName('canvas')[0];
    this.start();
  }

  start(){
    this.addListeners();
  }

  handleEvent(e:Event) {
    console.log(e);
    
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


  onMouseDown(e:Event){
    state.view.down[e.button] = true;
    if(e.button === 1){
      state.view.startDrag(e);
    }else{
      state.view.startSelection(e);
    }
  }

  onMouseUp(e:Event){
    state.view.down[e.button] = false;
    if(e.button === MouseButtons.MIDDLE){
      state.view.stopDrag();
    }else{
      state.view.endSelection(e);
    }
  }

  isMouseDown(button:number):boolean{
    return state.view.down[button];
  }

  onMouseMove(e:Event) {
    let point = Point.fromScreen(e.pageX, e.pageY);
    if(state.view.dragging){
      
      let delta = {x:e.pageX-state.view.lastPos.x, y: e.pageY-state.view.lastPos.y};
      state.view.lastPos = {x: e.pageX, y:e.pageY};
      state.view.state.offset.x += delta.x / state.view.state.scale;
      state.view.state.offset.y += delta.y / state.view.state.scale;
    }else if(state.view.selecting){
      state.view.updateSelection(e);
    }
    state.view.state.mousePosition = point;
  }

  onMouseWheel(e:Object){
    let d = e.wheelDelta;
    if(!d) d = -e.detail;
    state.view.zoom(d>0, e);
  }
  addListeners() {
    this.container.addEventListener('mousedown', this, false);
    this.container.addEventListener('mouseup', this, false);
    this.container.addEventListener('mousemove', this, false);
    this.container.addEventListener('mousewheel', this, false);
    this.container.addEventListener('DOMMouseScroll', this, false);
  }
  removeListeners() {
    this.container.removeEventListener('mousedown', this, false);
    this.container.removeEventListener('mouseup', this, false);
    this.container.removeEventListener('mousemove', this, false);
    this.container.removeEventListener('mousewheel', this, false);
    this.container.removeEventListener('DOMMouseScroll', this, false);
  }



  update(){
    //calculate whats under mousey
    // let charManager = getCharacterManager();
    // let char = charManager.getClosestCharacterToPoint(this.state.mousePosition);
    if(state.view.follow){
      state.view.centerOnPoint(state.view.follow.position.rounded);
    }

  }
}