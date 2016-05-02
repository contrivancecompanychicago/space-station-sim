import reducer from 'reducer';

import { createStore } from 'redux';

describe('reducer', () => {
  it('should be defined', () => {
    expect('reducer').toBeDefined();
  });
  it('should start off as an empty object', () => {
    const store = createStore(reducer);
    expect(store.getState()).toBeDefined();
  });
  it('should have tasks', () => {
    expect(reducer({}, {type:'NOTHING'}).tasks).toBeDefined();
  });

});
