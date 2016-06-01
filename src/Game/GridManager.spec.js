import GridManager from 'Game/GridManager';
import { keys } from 'lodash';

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

  describe('addNode', () => {
    it('should add a node', () => {
      let nodes = keys(state).length;
      gridManager.addNode(1, 2, "test");
      expect(keys(state).length - nodes).toBe(1);
    });
  });

  describe('getGridOffset', () => {
    it('should return an object with min/max x/y', () => {
      let output = gridManager.getGridOffset();
      expect(output.minx).toBeDefined();
      expect(output.miny).toBeDefined();
    });
  });
});
