import GridManager from 'Game/GridManager';
let gridManager;
let state;
describe('Game/GridManager', () => {
  beforeEach(() => {
    state = {};
    gridManager = new GridManager(state);
  });
  it('should capture a ref to state', () => {
    expect(gridManager.state).toBe(state);
  });
});
