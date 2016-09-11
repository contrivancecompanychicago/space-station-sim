import Point from 'Game/Point';

describe('Game/Point', () => {
  describe('constructor', () => {
    describe('error checking', () => {
      it('should throw if >2 args', () => {
        expect(() => {new Point(1,2,3)}).toThrow();
      })
      it('should throw if passed strings', () => {
        expect(() => {new Point('1','2')}).toThrow();
      })
    })
    it('should take x and y as two args', () => {
      let p = new Point(1,2);
      expect(p.x).toBe(1);
      expect(p.y).toBe(2);
    });
  });
  describe('block', () => {
    it('should return object with x y of block the point is located in', () => {
      let p = new Point(1,2)
    });
  });
});
