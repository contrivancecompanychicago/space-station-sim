import UIModel from 'Game/Model/UI';

import {keys} from 'lodash';

let uiModel;

describe('Game/Model/UI', () => {
  beforeEach(()=>{
    uiModel = new UIModel();
  });
  it('should be defined', () => {
    expect(uiModel).toBeDefined();
  })
  // describe('start', () => {
  //   it('should render something into the container', () => {
  //     uiModel.start();
  //     expect(container.childNodes.length>0).toBe(true);
  //   });
  // });

  // it('should respect its state object', () => {
  //   uiModel.start();
  //   expect(state).toBe(uiModel.state);
  //   expect(keys(state).length>4).toBe(true);
  //   uiModel.store.dispatch({type: 'CHANGE_GRID', id: 'test'});
  //   let out = uiModel.store.getState();
  //   expect(state).toBe(uiModel.state);
  // });


});
