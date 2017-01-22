 // some of this spec is still in game/point

import Block from 'Game/Block';
import Point from 'Game/Point';

import config from 'Game/config';

describe('Game/Block', () => {
  it('point', () => {
    let b = new Block({x:0,y:0});
    let p = b.point;
    //  console.log(b,p);
    expect(p.x).toBe(0);
    expect(p.y).toBe(0);
  });
  it('rect', () => {
    let b = new Block({x:1, y:1});
    let r = b.rect;

    expect(r.l).toBe(config.grid.width);
    expect(r.t).toBe(config.grid.height);
    expect(r.r).toBe(config.grid.width*2);
    expect(r.b).toBe(config.grid.height*2);
  });
});
