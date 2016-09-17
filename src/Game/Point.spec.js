import Point from 'Game/Point';

import * as state from 'Game/state';


import config from 'Game/config';




describe('Game/Point', () => {

  beforeEach(() => {
    state.default.View = {
      offset:{x:0,y:0},
      scale: 1
    };
  });

  describe('stringify', () => {
    it('shuold stringify without functions', () => {
      let p = new Point(1,2);
      let str = JSON.stringify(p);
      expect(str).toBe('{"x":1,"y":2}');
    });
  });

  describe('constructor', () => {
    describe('error checking', () => {
      it('should not error on zero', () => {
        new Point({x:0, y:0})
      })
      it('should throw if >2 args', () => {
        expect(() => {new Point(1,2,3);}).toThrow();
      });
      it('should throw if passed strings', () => {
        expect(() => {new Point('1','2');}).toThrow();
      });
      it('should throw if given single arg thats not an obj with xy', () => {
        expect(() => {new Point({'this':'broken'});}).toThrow();
      });
    });
    it('should take x and y as two args', () => {
      let p = new Point(1,2);
      expect(p.x).toBe(1);
      expect(p.y).toBe(2);
    });
    it('shoulds take an object with x y keys', () => {
      let p = new Point({x:1, y:2});
      expect(p.x).toBe(1);
      expect(p.y).toBe(2);
    });
  });
  describe('block', () => {
    describe('is', () => {
      it("shuold return true if the x's and y's match up", () => {
        // let b =
        let p1 = new Point(1,2);
        let p2 = new Point(2,3);
        let p3 = new Point(300,400);
        expect(p1.block.is(p2.block)).toBe(true);
        expect(p2.block.is(p3.block)).toBe(false);
      });
    });
    describe('center', () =>{
      it('should return the center of the block', () => {
        let p = new Point(1,2);
        expect(p.block.center.x).toBe(config.grid.width/2);
        expect(p.block.center.y).toBe(config.grid.height/2);
      });
      describe('screen', () => {
        it('should get screen from this');
      });
    });
    it('should return object with x y of block the point is located in', () => {
      let p = new Point(1,2);
      expect(p.block.x).toBe(0);
      expect(p.block.y).toBe(0);
    });
  });

  describe('screen', () => {
    it('should return the screen coordinates in offset and scale', () => {
      let p = new Point(1,2);
      state.default.View.offset = {x:10, y: 20};
      state.default.View.scale = 2;
      expect(p.screen.x).toBe(22);
      expect(p.screen.y).toBe(44);
    });
  });

  describe('STATIC', () => {
    describe('fromScreen', () => {
      it('should have fromScreen', () => {
        expect(Point.fromScreen).toBeDefined();
      });
      it('control case', () => {
        let p = Point.fromScreen(1,2);
        expect(p.x).toBe(1);
        expect(p.y).toBe(2);
      });
      it('scale case');
      it('offset case');
      it('scale and offset', () =>{
        state.default.View.offset = {x:10, y: 20};
        state.default.View.scale = 2;
        let p = Point.fromScreen(22,44);
        expect(p.x).toBe(1);
        expect(p.y).toBe(2);
      });
    });
  });
});
