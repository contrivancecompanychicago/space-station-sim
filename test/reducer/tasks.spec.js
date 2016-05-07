import { createStore } from 'redux';
import freeze from 'deep-freeze';

import tasks from 'reducer/tasks';

let action = {type:'NOTHING'};
let state = [];

describe('reducer/tasks', function(){

  beforeEach(() => {
    state = [];
    freeze(state);
  })
  it('should be defined', () => {
    expect(tasks).toBeDefined();
  });

  it('should return an array', () => {
    let out = tasks(state, action);
    expect(Array.isArray(out)).toBe(true);
  });

  describe('ADD_TASK', () => {
    it('should add to the state', () => {
      let out = tasks(state, {type:'ADD_TASK', task: 'build', x:1, y:2, block:3});
      // expect(out[0]).toBe(task);
      expect(out[0]).toBeDefined();
    });
  });

});
