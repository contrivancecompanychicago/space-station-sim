import Renderer from './Renderer';

let renderer;
let div;
describe('Game/Renderer', () => {
  beforeEach(() => {
    div = document.createElement('div');
    renderer = new Renderer(div);
  });
  it('should make a canvas', () => {
    expect(div.children.length).toBe(1);
  });
});
