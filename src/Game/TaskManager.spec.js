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
})
