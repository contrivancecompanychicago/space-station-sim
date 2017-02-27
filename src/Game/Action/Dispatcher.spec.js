
import {Dispatcher} from 'Game/Action/Dispatcher';
var dispatcher;
var state;
describe('Game/Action/Dispatcher', () => {
  beforeEach(() => {
    state = {};
    dispatcher = new Dispatcher(state);
  });
  it('should be defined', () => {
    expect(dispatcher).toBeDefined();
  })

});
