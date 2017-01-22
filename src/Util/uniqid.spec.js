import uniqid from 'Util/uniqid';

describe('Util/uniqid', () => {
  it('should be defined', () => {
    expect(uniqid).toBeDefined();
  });
  it('should return a number', () => {
    expect(typeof(uniqid())).toBe('number');
  });
  it('should return different each time', () => {
    let id1 = uniqid();
    let id2 = uniqid();
    let id3 = uniqid();
    expect(id1).not.toBe(id2);
    expect(id2).not.toBe(id3);
    expect(id1).not.toBe(id3);
  });
});
