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
  describe('start', () => {
    it('should render something into the container', () => {
      uiManager.start();
      expect(container.childNodes.length>0).toBe(true);
    });  
  });


});
