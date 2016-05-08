import timeScale from 'reducer/timeScale';

describe('timescale', function(){
  it('should default 1', function(){
    expect(timeScale(undefined, {type:'NOTHING'})).toBe(1);
  });
  it('should take more numbers', function(){
    expect(timeScale(1, {type:'TIME_SCALE', scale:2})).toBe(2);
  })
});
