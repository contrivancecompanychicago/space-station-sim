
import Game from 'Game';
import { extend, keys } from 'lodash';
import config from 'Game/config';


//keypresses
let mouseEvent = function(eventName, params){
  var event = document.createEvent('Event');
  extend(event, params);
  event.initEvent(eventName);
  document.dispatchEvent(event); //was document
};
// let mouseDown = function(){
//   mouseEvent('mousedown', {button: 0});
// };
// let mouseUp = function(){
//   mouseEvent('mouseup', {button: 0});
// };



describe('Integration', () => {
  it('should make grid objects', () => {
    const container = document.createElement('div');
    const game = new Game(container);


    // const viewManager = game.engine.getComponent('viewManager');
    // spyOn(viewManager, 'endSelection').and.callThrough();

    mouseEvent('mousedown', {button:0, pageX:1, pageY:1});
    mouseEvent('mouseup', {button:0, pageX:config.grid.width + 1, pageY:config.grid.height + 1});

    // expect(viewManager.endSelection).toHaveBeenCalled();

    expect(keys(game.state.Grid).length).toBe(4);

    game.destroy();
  });

  it('should clean up all listeners on destroy', () => {
    const container = document.createElement('div');
    const game = new Game(container);
    let viewManager = game.engine.getComponent('viewManager');
    spyOn(viewManager, 'destroy');
    game.destroy();
    expect(viewManager.destroy).toHaveBeenCalled();
  });

  it('should be UI clickable', () => {
    const container = document.createElement('div');
    const game = new Game(container);

    let panel = container.getElementsByClassName('mode')[0];
    expect(panel).toBeDefined();
    let select = panel.childNodes[1];

    // console.log(this.refs);
    var ReactTestUtils = require('react-addons-test-utils');
    ReactTestUtils.Simulate.click(select);

    expect(game.state.UI.mode).toBe('SELECT');
  });
});
