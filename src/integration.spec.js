
import Game from 'Game';
import { extend, keys } from 'lodash';


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
  it('should have integration specs');
  it('should make grid objects', () => {
    const container = document.createElement('div');
    const game = new Game(container);

    mouseEvent('mousedown', {button:0, x:1, y:1});
    mouseEvent('mouseup', {button:0, x:1, y:1});

    expect(keys(game.state.Grid).length).toBe(1);

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
});
