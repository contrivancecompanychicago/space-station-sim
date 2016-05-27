
import Game from 'Game';
import global from 'global';

describe('Game', () => {
  it('should exist', () => {
    expect(Game).toBeDefined();
  });
  it('should be a class', () => {
    expect(typeof Game).toBe("function");
  });
  describe('constructor', () => {
    it('should put stuff in a div', () =>{
      let div = document.createElement('div');
      let game = new Game(div);
      expect(div.childNodes.length>0).toBe(true);
    });
    // it('should set the globals', () => {
    //   let div = document.createElement('div');
    //   let game = new Game(div);
    //
    //   expect(global.engine).toBeDefined();
    // });
    it('should clear globals on startup', () => {
      global.myvar = "abc";
      new Game(document.createElement('div'));
      expect(global.myvar).not.toBeDefined();
    });
  });

});
