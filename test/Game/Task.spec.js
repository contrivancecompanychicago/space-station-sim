import Task, { state } from 'Game/Task';


describe('Game/Task', () => {
  it('should be defined', () => {
    expect(Task).toBeDefined();
  });
  describe('statics', () => {
    describe('add', () => {

    });
    describe('assign', () => {
      it('should be defined', () => {
        expect(Task.assign).toBeDefined();
      });
      it('should throw if passed a bad taskid', () => {
        expect(() => {Task.assign(undefined, 123);}).toThrow();
      });
      it('should add worker to a task', () => {
        state.test = {};
        Task.assign('test', 'worker');
        expect(state.test.worker).toBe('worker');
      });
    });
  });

});
