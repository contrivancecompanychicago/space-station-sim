
import TaskModel from 'Game/Model/Task';
import {defaults} from 'lodash';
import Types from 'Game/Data/Task';
import Task from 'Game/Type/Task';


let state = {};
let taskModel = new TaskModel();

const baseTask = {
  block: {x:0, y:0},
  type: 'TEST'
};
function testTask(task){
  return new Task(defaults(task, baseTask));
}


describe('Game/Model/Task', () => {
  beforeEach(() => {
    state = {};
    taskModel = new TaskModel(state);
  });
  it('should have state', () => {
    expect(taskModel.state).toBe(state);
  });

  describe('getTask', () => {
    it('should return a task by id', () => {
      state = {'mytask': {id:'mytask'}};
      taskModel = new TaskModel(state);
      expect(taskModel.getTask('mytask')).toBeDefined();
    });

    it('should return oldest task if not given an id', () => {
      let first = testTask({type:'first'});
      let second = testTask({type:'second'});
      let third = testTask({type:'third'});
      taskModel.addTask(first);
      taskModel.addTask(second);
      taskModel.addTask(third);
      let out = taskModel.getTask();
      expect(out).toBe(first);
    });
  });
  describe('addTask', () => {
    it('should add by id', () => {
      taskModel.addTask(testTask({id: 'test'}));
      expect(taskModel.getTask('test')).toBeDefined();
    });
    it('should return the task', () => {
      let task = testTask({id:'mytest'});
      let output = taskModel.addTask(task);
      expect(task).toBe(output);
    });
    it('should add in an ID if missing', () => {
      let task = testTask({id:'mytest'});
      let output = taskModel.addTask(task);
      expect(task.id).toBeDefined();
    });
  });

  describe('getNextTask', () => {
    it('should get the task after the one given to it', () => {
      let first = testTask({type:'first'});
      let second = testTask({type:'second'});
      let third = testTask({type:'third'});
      taskModel.addTask(first);
      taskModel.addTask(second);
      taskModel.addTask(third);
      expect(taskModel.getNextTask(first.id)).toBe(second);
      expect(taskModel.getNextTask(second.id)).toBe(third);
    });
  });


  describe('assignTask', () => {
    it('should set worker on a task', function(){
      taskModel.state = {dummy:{}};
      taskModel.assignTask('dummy', 'joe');
      expect(taskModel.getTask('dummy').worker).toBe('joe');
    });
  });

  describe('unassignTask', () => {
    it('should remove a worker', () => {
      taskModel.addTask(testTask({id: 'dummy', worker: 'joe'}));
      taskModel.unassignTask('dummy');
      expect(taskModel.getTask('dummy').worker).not.toBeDefined();
    });
  });

  describe('unassignTaskWorker', () => {
    it('should remove a worker', () => {
      taskModel.addTask(testTask({id: 'dummy', worker: 'joe'}));
      taskModel.unassignTaskWorker('joe');
      expect(taskModel.getTask('dummy').worker).not.toBeDefined();
    });
  });

});
