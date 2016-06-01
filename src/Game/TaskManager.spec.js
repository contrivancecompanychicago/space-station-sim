import TaskManager from 'Game/TaskManager';

let state = {};
let taskManager = new TaskManager();

describe('Game/TaskManager', () => {
  beforeEach(() => {
    state = {};
    taskManager = new TaskManager(state);
  });
  it('should have a type', () => {
    expect(taskManager.type).toBe('taskManager');
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
      let first = {type:'first'};
      let second = {type:'second'};
      let third = {type:'third'};
      taskManager.addTask(first);
      taskManager.addTask(second);
      taskManager.addTask(third);
      let out = taskManager.getTask();
      expect(out).toBe(first);
    });
  });
  describe('addTask', () => {
    it('should add by id', () => {
      taskManager.addTask({id: 'test'});
      expect(taskManager.getTask('test')).toBeDefined();
    });
    it('should return the task', () => {
      let task = {id:'mytest'};
      let output = taskManager.addTask(task);
      expect(task).toBe(output);
    });
    it('should add in an ID if missing', () => {
      let task = {type:'something'};
      let output = taskManager.addTask(task);
      expect(task.id).toBeDefined();
    });
  });

  describe('getNextTask', () => {
    it('should get the task after the one given to it', () => {
        let first = {type:'first'};
        let second = {type:'second'};
        let third = {type:'third'};
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
      taskManager.addTask({id: 'dummy', worker: 'joe'});
      taskManager.unassignTask('dummy');
      expect(taskManager.getTask('dummy').worker).not.toBeDefined();
    });
  });

  describe('unassignTaskWorker', () => {
    it('should remove a worker', () => {
      taskManager.addTask({id: 'dummy', worker: 'joe'});
      taskManager.unassignTaskWorker('joe');
      expect(taskManager.getTask('dummy').worker).not.toBeDefined();
    });
  });

});
