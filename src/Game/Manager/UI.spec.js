import UIManager from 'Game/Manager/UI';

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


});
