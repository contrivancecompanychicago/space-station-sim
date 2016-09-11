import Point from 'Game/Point';

import config from 'Game/config';


describe('Game/Point', () => {
  describe('constructor', () => {
    describe('error checking', () => {
      it('should throw if >2 args', () => {
        expect(() => {new Point(1,2,3)}).toThrow();
      })
      it('should throw if passed strings', () => {
        expect(() => {new Point('1','2')}).toThrow();
      });
      it('should throw if given single arg thats not an obj with xy', () => {
        expect(() => {new Point({'this':'broken'})}).toThrow();
      })
    })
    it('should take x and y as two args', () => {
      let p = new Point(1,2);
      expect(p.x).toBe(1);
      expect(p.y).toBe(2);
    });
    it('shoulds take an object with x y keys', () => {
      let p = new Point({x:1, y:2});
      expect(p.x).toBe(1);
      expect(p.y).toBe(2);
    })
  });
  describe('block', () => {
    describe('center', () =>{
      it('should return the center of the block', () => {
        let p = new Point(1,2);
        expect(p.block.center.x).toBe(config.grid.width/2);
        expect(p.block.center.y).toBe(config.grid.height/2);
      })
    })
    it('should return object with x y of block the point is located in', () => {
      let p = new Point(1,2);
      expect(p.block.x).toBe(0);
      expect(p.block.y).toBe(0);
    });
  });

  describe('screen', () => {
    it('should return the screen coordinates in offset and scale')
  })

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
      it('scale case')
      it('offset case')
      it('scale and offset')
    });
  });
});
