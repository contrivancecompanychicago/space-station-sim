
import Game from 'Game';
import { extend, keys } from 'lodash';
import config from 'Game/config';
import ReactTestUtils from 'react-addons-test-utils';


//keypresses
let mouseEvent = function(target, eventName, params){
  var event = document.createEvent('Event');
  extend(event, params);
  event.initEvent(eventName, true, true);
  target.dispatchEvent(event); //was document
};
// let mouseDown = function(){
//   mouseEvent('mousedown', {button: 0});
// };
// let mouseUp = function(){
//   mouseEvent('mouseup', {button: 0});
// };

let container = document.createElement('div');
let game;

const clickButton = function (button){
  const select = container.getElementsByClassName(button)[0];
  ReactTestUtils.Simulate.click(select);
};

xdescribe('Integration', () => {
  beforeEach(() => {
    container = document.createElement('div');
    game = new Game(container);
  });
  it('shuld not error in the first few ms', (done) => {
    //would throw error here
    setInterval(done, 500);
  });
  it('should make grid objects', () => {

    clickButton('button-mode-grid');
    clickButton('button-grid-Floor');
    expect(game.state.UI.mode).toBe('GRID');
    expect(game.state.UI.grid).toBe('FLOOR');

    const viewManager = game.engine.getComponent('viewManager');
    spyOn(viewManager, 'endSelection').and.callThrough();
    const actionDispatcher = game.engine.getComponent('actionDispatcher');
    spyOn(actionDispatcher, 'userAction').and.callThrough();

    mouseEvent(viewManager.container, 'mousedown', {button:0, pageX:1, pageY:1});
    mouseEvent(viewManager.container, 'mouseup', {button:0, pageX:config.grid.width + 1, pageY:config.grid.height + 1});

    expect(viewManager.endSelection).toHaveBeenCalled();
    expect(actionDispatcher.userAction).toHaveBeenCalled();

    expect(keys(game.state.Grid).length).toBe(796);

    game.destroy();
  });

  it('should clean up all listeners on destroy', () => {
    let viewManager = game.engine.getComponent('viewManager');
    spyOn(viewManager, 'destroy');
    game.destroy();
    expect(viewManager.destroy).toHaveBeenCalled();
  });

  it('should be UI clickable', () => {
    clickButton('button-mode-select');
    expect(game.state.UI.mode).toBe('SELECT');
    game.destroy();
  });
});
