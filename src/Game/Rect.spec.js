import Rect from './Rect';
import config from 'Game/config';

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
});
