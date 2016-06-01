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

  describe('makeKey', () => {
    it('should turn x, y into string', () => {
      let key = gridManager.makeKey(12, 34);
      expect(typeof key).toBe('string');
    });
  });

  describe('parseKey', () => {
    it('should turn string from makekey into its orig values', () => {
      let orig = {x:12, y:34};
      let key = gridManager.makeKey(orig.x, orig.y);
      let parsed = gridManager.parseKey(key);
      expect(orig.x).toBe(parsed.x);
      expect(orig.y).toBe(parsed.y);
    });
  });



  describe('addNode', () => {
    it('should add a node', () => {
      let nodes = keys(state).length;
      gridManager.addNode(1, 2, "test");
      expect(keys(state).length - nodes).toBe(1);
    });
  });

  describe('getNode', () => {
    it('should return an added node', () => {
      expect(gridManager.getNode(12, 34)).not.toBeDefined();
      gridManager.addNode(12, 34, "test");
      expect(gridManager.getNode(12, 34)).toBeDefined();
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
