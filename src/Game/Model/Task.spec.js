
import TaskManager from 'Game/Model/Task';
import {defaults} from 'lodash';
import Types from 'Game/Data/Task';
import Task from 'Game/Type/Task';


let state = {};
let taskManager = new TaskManager();

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
    taskManager = new TaskManager(state);
  });
  it('should have state', () => {
    expect(taskManager.state).toBe(state);
  });

  describe('getTask', () => {
    it('should return a task by id', () => {
      state = {'mytask': {id:'mytask'}};
      taskManager = new TaskManager(state);
      expect(taskManager.getTask('mytask')).toBeDefined();
    });

    it('should return oldest task if not given an id', () => {
      let first = testTask({type:'first'});
      let second = testTask({type:'second'});
      let third = testTask({type:'third'});
      taskManager.addTask(first);
      taskManager.addTask(second);
      taskManager.addTask(third);
      let out = taskManager.getTask();
      expect(out).toBe(first);
    });
  });
  describe('addTask', () => {
    it('should add by id', () => {
      taskManager.addTask(testTask({id: 'test'}));
      expect(taskManager.getTask('test')).toBeDefined();
    });
    it('should return the task', () => {
      let task = testTask({id:'mytest'});
      let output = taskManager.addTask(task);
      expect(task).toBe(output);
    });
    it('should add in an ID if missing', () => {
      let task = testTask({id:'mytest'});
      let output = taskManager.addTask(task);
      expect(task.id).toBeDefined();
    });
  });

  describe('getNextTask', () => {
    it('should get the task after the one given to it', () => {
      let first = testTask({type:'first'});
      let second = testTask({type:'second'});
      let third = testTask({type:'third'});
      taskManager.addTask(first);
      taskManager.addTask(second);
      taskManager.addTask(third);
      expect(taskManager.getNextTask(first.id)).toBe(second);
      expect(taskManager.getNextTask(second.id)).toBe(third);
    });
  });


  describe('assignTask', () => {
    it('should set worker on a task', function(){
      taskManager.state = {dummy:{}};
      taskManager.assignTask('dummy', 'joe');
      expect(taskManager.getTask('dummy').worker).toBe('joe');
    });
  });

  describe('unassignTask', () => {
    it('should remove a worker', () => {
      taskManager.addTask(testTask({id: 'dummy', worker: 'joe'}));
      taskManager.unassignTask('dummy');
      expect(taskManager.getTask('dummy').worker).not.toBeDefined();
    });
  });

  describe('unassignTaskWorker', () => {
    it('should remove a worker', () => {
      taskManager.addTask(testTask({id: 'dummy', worker: 'joe'}));
      taskManager.unassignTaskWorker('joe');
      expect(taskManager.getTask('dummy').worker).not.toBeDefined();
    });
  });

});
