import UIModel from 'Game/Model/UI';

import {keys} from 'lodash';

let uiManager;

describe('Game/Model/UI', () => {
  beforeEach(()=>{
    uiManager = new UIModel();
  });
  it('should be defined', () => {
    expect(uiManager).toBeDefined();
  })
  // describe('start', () => {
  //   it('should render something into the container', () => {
  //     uiManager.start();
  //     expect(container.childNodes.length>0).toBe(true);
  //   });
  // });

  // it('should respect its state object', () => {
  //   uiManager.start();
  //   expect(state).toBe(uiManager.state);
  //   expect(keys(state).length>4).toBe(true);
  //   uiManager.store.dispatch({type: 'CHANGE_GRID', id: 'test'});
  //   let out = uiManager.store.getState();
  //   expect(state).toBe(uiManager.state);
  // });


});
