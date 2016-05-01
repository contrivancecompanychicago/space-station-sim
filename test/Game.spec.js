const Game = require('../src/Game');

describe('Game', () => {
  it('should exist', function(){
    expect(Game).toBeDefined();
  });
  it('should be a class', function(){
    expect(typeof Game).toBe("function");
    new Game();
  });
})
