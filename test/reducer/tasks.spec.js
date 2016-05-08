import { createStore } from 'redux';
import freeze from 'deep-freeze';

import tasks from 'reducer/tasks';

let action = {type:'NOTHING'};
let state = {};

describe('reducer/tasks', function(){

  beforeEach(() => {
    state = {};
    freeze(state);
  })
  it('should be defined', () => {
    expect(tasks).toBeDefined();
  });

  it('should return an object', () => {
    let out = tasks(state, action);
    expect(typeof out).toBe('object');
  });



});
