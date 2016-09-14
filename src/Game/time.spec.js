import * as times from 'Game/time';
import time from 'Game/time';

describe('time', () => {
  it('should be overridable', () => {
    times.default = "abc";
    expect(time).toBe("abc");//wow actually worked
  });
});
