import tasks from 'reducer/tasks';
import { createStore } from 'redux';
let action = {type:'NOTHING'};

describe('reducer/tasks', function(){

  it('should be defined', () => {
    expect(tasks).toBeDefined();
  });
  it('should return an array', () => {
    let out = tasks(undefined, action);
    expect(typeof out).toBe('object');
    expect(Array.isArray(out)).toBe(true);
    expect(out.length).toBeDefined();
  });
  describe('ADD_TASK', () => {

    it('should add to the state', () => {
      let task = 'abc123'
      let out = tasks([], {type:'ADD_TASK', task: task});
      expect(out[0]).toBe(task);
    })

  })

});
