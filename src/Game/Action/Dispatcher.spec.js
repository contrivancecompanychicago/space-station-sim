import Imagine from 'imagine-engine';
import Dispatcher from 'Game/Action/Dispatcher';
let dispatcher;
let state;
describe('Game/Action/Dispatcher', () => {
  beforeEach(() => {
    state = {};
    dispatcher = new Dispatcher(state);
  });
  it('should have state', () => {
    expect(dispatcher.state).toBe(state);
  });

  it('should respond to userAction notification', () => {
    spyOn(dispatcher, "userAction");
    let engine = new Imagine();
    engine.register(dispatcher);
    engine.notify('userAction', {});
    expect(dispatcher.userAction).toHaveBeenCalled();
  });
});
