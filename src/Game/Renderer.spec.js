import Renderer from './Renderer';

let renderer;
let div;
let state;

// jest.setMock('./Renderer/Layer', {})
jest.mock('./Renderer/Layer')
describe('Game/Renderer', () => {
  beforeEach(() => {
    div = document.createElement('div');
    state = {};
    renderer = new Renderer(state, div);
  });
  it('should rerender on resize')
  // it('should make a canvas', () => {
  //   // pending();///<----------------
  //   expect(div.children.length).toBe(1);
  // });
});
