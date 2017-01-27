import {globalToLocal, localToGlobal, blockToCenter, makeKey} from 'Util';
import config from 'Game/config';
const Util = require('Util');

import namegen from './namegen'
describe('Util/namegen', () =>{
  it('should work', () => {
    expect(namegen).toBeDefined();
    expect(namegen().firstname).toBeDefined()
    expect(namegen().lastname).toBeDefined()
  })
})


describe('Util', () => {
  it('should have globalToLocal', () => {
    // console.log(Util);
    expect(globalToLocal).toBeDefined();
    expect(typeof globalToLocal).toBe('function');
  });
    it('should have localToGlobal', () => {
      // console.log(Util);
      expect(localToGlobal).toBeDefined();
      expect(typeof localToGlobal).toBe('function');
    });
  xdescribe('blockToCenter', () => {
    it('should convert a block into a point in the blocks center', () => {
      let out = blockToCenter({x:0, y:0});
      // console.log(out);
      expect(out.x).toBe(config.grid.width/2);
      expect(out.y).toBe(config.grid.height/2);

      out = blockToCenter({x:1, y:1});
      expect(out.x).toBe(config.grid.width * 1.5);
      expect(out.y).toBe(config.grid.height * 1.5);
    });
  });
});

describe('makeKey', () => {

  it('should turn x, y into string', () => {
    let key = makeKey(-12, 34);
    expect(typeof key).toBe('string');
  });
  it('should throw if not given numbers', () => {
    expect(() => {makeKey("joe", 1);}).toThrow();
  });

});
//
// describe('parseKey', () => {
//
//   it('should turn string from makekey into its orig values', () => {
//     let orig = {x:-12, y:34};
//     let key = gridManager.makeKey(orig.x, orig.y);
//     let parsed = gridManager.parseKey(key);
//     expect(orig.x).toBe(parsed.x);
//     expect(orig.y).toBe(parsed.y);
//   });
//
// });
