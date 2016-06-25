import {globalToLocal, localToGlobal} from 'Util';
const Util = require('Util');

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
});

// describe('makeKey', () => {
//
//   it('should turn x, y into string', () => {
//     let key = gridManager.makeKey(-12, 34);
//     expect(typeof key).toBe('string');
//   });
//
// });
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
