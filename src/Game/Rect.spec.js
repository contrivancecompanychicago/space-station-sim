import Rect from './Rect';
import config from 'Game/config';

import Point from 'Game/Point';

describe('Rect', () => {
  it('shuld be defined', () => {
    expect(Rect).toBeDefined();
  });
  it('should take 4 params', () => {
    let rect = new Rect(1,2,3,4);
    expect(rect.t).toBe(1);
  });
  it('should take one object', () => {
    let rect = new Rect({t:1,r:2,b:3,l:4});
    expect(rect.t).toBe(1);
  });
  it('blockRect', () => {
    let rect = new Rect(1, config.grid.width + 1, config.grid.height+1, 1);
    let blockRect = rect.blockRect();
    expect(blockRect.t).toBe(0);
    expect(blockRect.r).toBe(1);
    expect(blockRect.b).toBe(1);
    expect(blockRect.l).toBe(0);
  });

  it('should take two points', () => {
    let p1 = new Point(1,2);
    let p2 = new Point(3,4);

    let rect = new Rect(p1, p2);
    expect(rect.l).toBe(1);
    expect(rect.t).toBe(2);
    expect(rect.r).toBe(3);
    expect(rect.b).toBe(4);

    //check back-to-front
    rect = new Rect(p2, p1);
    expect(rect.l).toBe(1);
    expect(rect.t).toBe(2);
    expect(rect.r).toBe(3);
    expect(rect.b).toBe(4);


  });
});
