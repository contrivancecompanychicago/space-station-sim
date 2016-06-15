import Renderer from './Renderer';

let renderer;
let div;
let state;
describe('Game/Renderer', () => {
  beforeEach(() => {
    div = document.createElement('div');
    state = {};
    renderer = new Renderer(state, div);
  });
  it('should make a canvas', () => {
    pending();///<----------------
    expect(div.children.length).toBe(1);
  });
});
