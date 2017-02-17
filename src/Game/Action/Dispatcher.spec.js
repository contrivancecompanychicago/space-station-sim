
import Dispatcher from 'Game/Action/Dispatcher';
var dispatcher;
var state;
describe('Game/Action/Dispatcher', () => {
  beforeEach(() => {
    state = {};
    dispatcher = new Dispatcher(state);
  });
  it('should have state', () => {
    expect(dispatcher.state).toBe(state);
  });

});
