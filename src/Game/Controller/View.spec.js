import ViewModel from 'Game/Model/View';
import ViewController from 'Game/Controller/View';
import Imagine from 'imagine-engine';
import { extend } from 'lodash';

import state from 'Game/state';
// let state;
let viewController
let container;

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


describe('Game/Controller/View', () => {
  beforeEach(() => {
    state.init()
    container = document.createElement('div');
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);

    // viewController = new ViewModel();
    viewController = new ViewController(container)

  });
  afterEach(() => {
    // viewController.destroy();
  });

  describe('constructor', () => {
  });

  describe('detecting middle mouse', () => {
    it('should be called', () =>{
      viewController.removeListeners();
      spyOn(viewController, 'onMouseDown').and.callThrough();
      spyOn(state.view, 'startDrag').and.callThrough();
      spyOn(viewController, 'onMouseUp').and.callThrough();
      spyOn(state.view, 'stopDrag').and.callThrough();
      viewController.addListeners();
      middleMouseDown(viewController.container);
      expect(viewController.onMouseDown).toHaveBeenCalled();
      expect(state.view.startDrag).toHaveBeenCalled();
      middleMouseUp(viewController.container);
      expect(viewController.onMouseUp).toHaveBeenCalled();
      expect(state.view.stopDrag).toHaveBeenCalled();
    });
  });

  describe('selection', () => {
    it('should detect mouse clicking', () => {
      mouseEvent(viewController.container, 'mousedown', {button: 0});
      expect(state.view.down).toBeDefined();
      expect(state.view.down['0']).toBe(true);
    });
    // it('should work even if scrolling halfway through selection');
    it('should notify a selection on mouseup', () => {
      // viewController.notify = () => {};
      spyOn(state.view, 'endSelection');
      mouseEvent(viewController.container, 'mousedown', {button: 0, pageX: 1, pageY: 1});
      mouseEvent(viewController.container, 'mouseup', {button: 0, pageX: 10, pageY: 10});
      expect(state.view.endSelection).toHaveBeenCalled();
    });
  });
});
