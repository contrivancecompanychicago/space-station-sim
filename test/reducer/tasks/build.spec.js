
import build from 'reducer/tasks/build';
import {keys} from 'lodash';


describe('reducer/tasks/build', () => {

  describe('ADD_TASK', () => {
    it('should add to the state', () => {
      let action = {type:'ADD_TASK', task: 'build', x:1, y:2, block:3}
      let out = build({}, action);
      // expect(out[0]).toBe(task);
      expect(out[action.id]).toBeDefined();
      expect(keys(out).length).toBe(1);
    });
  });

  describe('ASSIGN_TASK', () => {
    it('should set worker on a task', function(){
      let state = {dummy:{}};
      let action = {type:'ASSIGN_TASK', id: 'dummy', worker: "joe"};
      let out = build(state, action);
      expect(out.dummy.worker).toBe('joe');
    });
  });

  describe('default', () => {
    it('should fall thru and return', function(){
      let state = {dummy:true};
      let out = build(state, {type:'NOTHING'});
      expect(out).toBe(state);
    });
  });

})
