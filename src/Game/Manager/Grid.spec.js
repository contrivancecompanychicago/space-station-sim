import GridManager from 'Game/Manager/Grid';
import { keys } from 'lodash';

let gridManager;
let state;
describe('Game/Manager/Grid', () => {

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

  describe('getNode', () => {

    it('should return an added node', () => {
      expect(gridManager.getNode(12, 34)).not.toBeDefined();
      gridManager.addNode(12, 34, "test");
      expect(gridManager.getNode(12, 34)).toBeDefined();
    });

  });

  describe('getMin', () => {

    it('should return an object with min/max x/y', () => {
      let min = gridManager.getMin();
      expect(min.x).toBeDefined();
      expect(min.y).toBeDefined();
    });

    it('should get the smallest values', () => {
      gridManager.addNode(-3,2);
      gridManager.addNode(4,3);
      gridManager.addNode(8,-1);
      gridManager.addNode(5,5);
      let min = gridManager.getMin();
      expect(min.x).toBe(-3);
      expect(min.y).toBe(-1);
    });

  });

  describe('getPath', () => {

    it('should return a path', () => {
      gridManager.addNode(1,1, 'test');
      gridManager.addNode(1,2, 'test');
      gridManager.addNode(2,2, 'test');
      let path = gridManager.getPath({x:1,y:1}, {x:2, y:2});
      // expect(path).toBe([{x:1, y:2},{x:2, y:2}]);
      expect(path[0].x).toBe(1);
      expect(path[0].y).toBe(2);
      expect(path[1].x).toBe(2);
      expect(path[1].y).toBe(2);
    });

    it('should return [end] if start and end are same', () => {
        gridManager.addNode(1,1, 'test');
        let path = gridManager.getPath({x:1,y:1}, {x:1, y:1});
        expect(path[0].x).toBe(1);
        expect(path[0].y).toBe(1);
    });

  });

});
