import ViewModel from 'Game/Model/View';
import ViewController from 'Game/Controller/View';
import Imagine from 'imagine-engine';
import { extend } from 'lodash';

import * as state from 'Game/state';
// let state;
let viewManager;
let container;

keypresses
let mouseEvent = function(target, eventName, params){
  var event = document.createEvent('Event');
  extend(event, params);
  event.initEvent(eventName, true, true);
  target.dispatchEvent(event);
};
let middleMouseDown = function(target){
  mouseEvent(target, 'mousedown', {button: 1});
};
let middleMouseUp = function(target){
  mouseEvent(target, 'mouseup', {button: 1});
};


describe('Game/Model/View', () => {
  beforeEach(() => {
    // state.default.View = {};
    // container = document.createElement('div');
    // let canvas = document.createElement('canvas');
    // container.appendChild(canvas);
    viewManager = new ViewModel();
  });
  afterEach(() => {
    viewManager.destroy();
  });

  describe('constructor', () => {
    it('should set defaults', () => {
      expect(viewManager.state).toBeDefined();
      expect(viewManager.state.offset).toBeDefined();
    });
    it('should mutate', () => {
      expect(viewManager.state).toBe(state.default.View);
    });
  });

  describe('detecting middle mouse', () => {
    it('should be called by imagine', () =>{
      viewManager.removeListeners();
      spyOn(viewManager, 'onMouseDown').and.callThrough();
      spyOn(viewManager, 'startDrag').and.callThrough();
      spyOn(viewManager, 'onMouseUp').and.callThrough();
      spyOn(viewManager, 'stopDrag').and.callThrough();
      viewManager.addListeners();
      middleMouseDown(viewManager.container);
      expect(viewManager.onMouseDown).toHaveBeenCalled();
      expect(viewManager.startDrag).toHaveBeenCalled();
      middleMouseUp(viewManager.container);
      expect(viewManager.onMouseUp).toHaveBeenCalled();
      expect(viewManager.stopDrag).toHaveBeenCalled();
    });
  });

  describe('drag', () => {
    it('should work', () => {
      viewManager.startDrag({pageX: 0, pageY: 0});
      viewManager.onMouseMove({pageX: 10, pageY: 20});
      expect(viewManager.state.offset.x).toBe(10);
      expect(viewManager.state.offset.y).toBe(20);
    });
    it('should work multiple times', () => {

      viewManager.startDrag({pageX: 0, pageY: 0});
      viewManager.onMouseMove({pageX: 10, pageY: 20});
      viewManager.onMouseMove({pageX: 10, pageY: 20});
      expect(viewManager.state.offset.x).toBe(20);
      expect(viewManager.state.offset.y).toBe(40);
    })
  });

  describe('startDrag', () => {
    it('should set lastPos', () => {
      expect(viewManager.lastPos).not.toBeDefined();
      viewManager.startDrag({pageX: 0, pageY: 0});
      expect(viewManager.lastPos).toBeDefined();
    });
  });

  describe('selection', () => {
    it('should detect mouse clicking', () => {
      mouseEvent(viewManager.container, 'mousedown', {button: 0});
      expect(viewManager.down).toBeDefined();
      expect(viewManager.down['0']).toBe(true);
    });
    // it('should work even if scrolling halfway through selection');
    it('should notify a selection on mouseup', () => {
      viewManager.notify = () => {};
      spyOn(viewManager, 'notify');
      mouseEvent(viewManager.container, 'mousedown', {button: 0, pageX: 1, pageY: 1});
      mouseEvent(viewManager.container, 'mouseup', {button: 0, pageX: 10, pageY: 10});
      expect(viewManager.notify).toHaveBeenCalled();
    });
    // it('should use the UI to determine what to do with the selection');
    it('should have start end and rect', () => {
      viewManager.notify = () => {};
      spyOn(viewManager, 'notify');
      mouseEvent(viewManager.container, 'mousedown', {button: 0, pageX: 1, pageY: 1});
      mouseEvent(viewManager.container, 'mouseup', {button: 0, pageX: 10, pageY: 10});
      let args = viewManager.notify.calls.first().args;
      let selection = args[1];
      expect(selection.start).toBeDefined();
      expect(selection.end).toBeDefined();
      expect(selection.rect).toBeDefined();
    });

  });

});
