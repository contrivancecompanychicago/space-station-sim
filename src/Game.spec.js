import Game from 'Game';

xdescribe('Game', () => {
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


});
