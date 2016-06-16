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
