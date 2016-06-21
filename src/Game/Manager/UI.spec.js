import UIManager from 'Game/Manager/UI';

import {keys} from 'lodash';

let state;
let container;
let uiManager;

describe('Game/Manager/UI', () => {
  beforeEach(()=>{

    state = {};
    container = document.createElement('div');
    uiManager = new UIManager(state, container);
  });
  describe('start', () => {
    it('should render something into the container', () => {
      uiManager.start();
      expect(container.childNodes.length>0).toBe(true);
    });
  });

  it('should respect its state object', () => {
    uiManager.start();
    expect(state).toBe(uiManager.state);
    expect(keys(state).length).toBe(4);
    uiManager.store.dispatch({type: 'CHANGE_GRID', id: 'test'});
    let out = uiManager.store.getState();
    expect(state).toBe(uiManager.state);
    // console.log(uiManager);
    // uiManager.store.dis
  });


});
