import view from 'reducer/view';

describe('reducer/view', () => {
  it('should return a scale', () => {
    expect(view(undefined, {type:'NOTHING'}).scale).toBe(1);
  });
  it('should return a x y offset', () => {
    let out = view(undefined, {type:'NOTHING'})
    expect(out.offset).toBeDefined();
    expect(out.offset.x).toBe(0);
    expect(out.offset.y).toBe(0);
  });
  it('should respond to VIEW_SCALE', () => {
    let out = view({}, {type:'VIEW_SCALE', scale:5});
    expect(out.scale).toBe(5);
  });
  it('should respond to VIEW_MOVE', () => {
    let out = view({offset:{x:1, y:2}}, {type:'VIEW_MOVE', x:3, y:4});
    expect(out.offset.x).toBe(4);
    expect(out.offset.y).toBe(6);
  });
  it('should respond to VIEW_SET_OFFSET', () => {
    let out = view({offset:{x:1, y:2}}, {type:'VIEW_SET_OFFSET', x:3, y:4});
    expect(out.offset.x).toBe(3);
    expect(out.offset.y).toBe(4);
  });
})
