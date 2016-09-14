require('babel-polyfill'); //for generators~

describe('generators', () => {
  it('should be supported', () => {
    function* gen(){
      return 123;
    }
    expect(gen).toBeDefined();
    expect(gen().next().value).toBe(123);
  });

  it('should nest generators', () => {
    function* child(name){
      yield 'a';
      yield 'b';
      yield 'c';
      yield name;
    }
    function* parent(inp){
      yield 1;
      yield 2;
      yield *child('bob');
      inp.test = 'test';
      yield 3;
    }
    let input = {};
    let gen = parent(input);

    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe("a");
    expect(gen.next().value).toBe("b");
    expect(gen.next().value).toBe("c");
    expect(gen.next().value).toBe("bob");
    expect(input.test).not.toBeDefined();
    expect(gen.next().value).toBe(3);
    expect(input.test).toBe('test');
  });
});
