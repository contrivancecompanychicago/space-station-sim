import ViewManager from 'Game/ViewManager';
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


describe('Game/ViewManager', () => {
  beforeEach(() => {
    state = {};
    viewManager = new ViewManager(state);
  });

  describe('detecting middle mouse', () => {
    it('should be called by imagine', () =>{
      spyOn(viewManager, 'onMouseDown').and.callThrough();
      viewManager.start();
      middleMouseDown();
      expect(viewManager.onMouseDown).toHaveBeenCalled();
    });
  });

});
