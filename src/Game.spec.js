import Game from 'Game';

import {State} from 'Game/state'

jest.mock('./Game/Renderer/Layer')
describe('Game', () => {
  let div;
  let game;
  beforeEach(() => {
    div = document.createElement('div');
    game = new Game(div);
  });

  it('should be defined', () => {
    expect(Game).toBeDefined();
  });

  it('should put some shit into a div', () => {
    expect(div.children.length > 0).toBe(true);
  });

  it('should spawn the engine', () => {
    expect(game.engine).toBeDefined();
  });
  it('hot mode', () => {
    spyOn(State.prototype, 'load');
    new Game(div);
    expect(State.prototype.load).toHaveBeenCalled();
    
  });


});
