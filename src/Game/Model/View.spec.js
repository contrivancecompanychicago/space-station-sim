import ViewModel from 'Game/Model/View';

import { extend } from 'lodash';
import Point from 'Game/Point'

import * as state from 'Game/state';
// let state;
let viewModel;
let container;




describe('Game/Model/View', () => {
  beforeEach(() => {
    viewModel = new ViewModel();
    Point.registerState({view:viewModel});
  });
  afterEach(() => {
  });

  describe('constructor', () => {
    it('should set defaults', () => {
      expect(viewModel.state).toBeDefined();
      expect(viewModel.state.offset).toBeDefined();
    });
  });


  describe('drag', () => {
    it('should work', () => {
      viewModel.startDrag({pageX: 0, pageY: 0});
      viewModel.mouseMove({pageX: 10, pageY: 20});
      expect(viewModel.state.offset.x).toBe(10);
      expect(viewModel.state.offset.y).toBe(20);
    });
    it('should work multiple times', () => {

      viewModel.startDrag({pageX: 0, pageY: 0});
      viewModel.mouseMove({pageX: 10, pageY: 20});
      viewModel.mouseMove({pageX: 10, pageY: 20});
      expect(viewModel.state.offset.x).toBe(20);
      expect(viewModel.state.offset.y).toBe(40);
    })
  });

  describe('startDrag', () => {
    it('should set lastPos', () => {
      expect(viewModel.lastPos).not.toBeDefined();
      viewModel.startDrag({pageX: 0, pageY: 0});
      expect(viewModel.lastPos).toBeDefined();
    });
  });

  // TODO: UNCOMMENT AND FIX

  // describe('selection', () => {
  //   it('should detect mouse clicking', () => {
  //     mouseEvent(viewModel.container, 'mousedown', {button: 0});
  //     expect(viewModel.down).toBeDefined();
  //     expect(viewModel.down['0']).toBe(true);
  //   });
  //   // it('should work even if scrolling halfway through selection');
  //   it('should notify a selection on mouseup', () => {
  //     viewModel.notify = () => {};
  //     spyOn(viewModel, 'notify');
  //     mouseEvent(viewModel.container, 'mousedown', {button: 0, pageX: 1, pageY: 1});
  //     mouseEvent(viewModel.container, 'mouseup', {button: 0, pageX: 10, pageY: 10});
  //     expect(viewModel.notify).toHaveBeenCalled();
  //   });
  //   // it('should use the UI to determine what to do with the selection');
  //   it('should have start end and rect', () => {
  //     viewModel.notify = () => {};
  //     spyOn(viewModel, 'notify');
  //     mouseEvent(viewModel.container, 'mousedown', {button: 0, pageX: 1, pageY: 1});
  //     mouseEvent(viewModel.container, 'mouseup', {button: 0, pageX: 10, pageY: 10});
  //     let args = viewModel.notify.calls.first().args;
  //     let selection = args[1];
  //     expect(selection.start).toBeDefined();
  //     expect(selection.end).toBeDefined();
  //     expect(selection.rect).toBeDefined();
  //   });

  // });

});
