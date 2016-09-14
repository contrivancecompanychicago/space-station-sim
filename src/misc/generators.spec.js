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
    function* child(){
      yield 'a';
      yield 'b';
      yield 'c';
    }
    function* parent(){
      yield 1;
      yield 2;
      yield *child();
      yield 3;
    }
    let gen = parent();

    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe("a");
    expect(gen.next().value).toBe("b");
    expect(gen.next().value).toBe("c");
    expect(gen.next().value).toBe(3);
  });
});
