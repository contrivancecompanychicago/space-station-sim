import ViewManager from 'Game/Manager/View';
import Imagine from 'imagine-engine';
import { extend } from 'lodash';

let state;
let viewManager;

//keypresses
let mouseEvent = function(eventName, params){
  var event = document.createEvent('Event');
  extend(event, params);
  event.initEvent(eventName);
  document.dispatchEvent(event);
};
let middleMouseDown = function(){
  mouseEvent('mousedown', {button: 1});
};
let middleMouseUp = function(){
  mouseEvent('mouseup', {button: 1});
};


describe('Game/Manager/View', () => {
  beforeEach(() => {
    state = {};
    viewManager = new ViewManager(state);
  });

  describe('constructor', () => {
    it('should set defaults', () => {
      expect(viewManager.state).toBeDefined();
      expect(viewManager.state.offset).toBeDefined();
    });
    it('should mutate', () => {
      expect(viewManager.state).toBe(state);
    });
  });

  describe('detecting middle mouse', () => {
    it('should be called by imagine', () =>{
      spyOn(viewManager, 'onMouseDown').and.callThrough();
      spyOn(viewManager, 'startDrag').and.callThrough();
      spyOn(viewManager, 'onMouseUp').and.callThrough();
      spyOn(viewManager, 'stopDrag').and.callThrough();
      viewManager.start();
      middleMouseDown();
      expect(viewManager.onMouseDown).toHaveBeenCalled();
      expect(viewManager.startDrag).toHaveBeenCalled();
      middleMouseUp();
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
  });

  describe('startDrag', () => {
    it('should set lastPos', () => {
      expect(viewManager.lastPos).not.toBeDefined();
      viewManager.startDrag({pageX: 0, pageY: 0});
      expect(viewManager.lastPos).toBeDefined();
    });
  });

});
