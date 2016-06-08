import UIManager from 'Game/UIManager';

let state;
let container;
let uiManager;

describe('Game/UIManager', () => {
  beforeEach(()=>{

    state = {};
    container = document.createElement('div');
    uiManager = new UIManager(state, container);
  });

  it('should render something into the container', () => {
    expect(container.childNodes.length>0).toBe(true);
  });

});
