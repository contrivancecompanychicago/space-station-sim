import GridModel from 'Game/Model/Grid';
import Grid from 'Game/Type/Grid';
import { keys } from 'lodash';
import Rect from 'Game/Rect'
import Block from 'Game/Block'
import Obj from 'Game/Type/Object'

let gridModel;
let state;
describe('Game/Model/Grid', () => {

	beforeEach(() => {
		state = {};
		gridModel = new GridModel(state);
	});

	it('should capture a ref to state', () => {
		expect(gridModel.state).toBe(state);
	});


	describe('addNode', () => {

		it('should add a node', () => {
			let nodes = keys(state).length;
			gridModel.addNode(1, 2, "test");
			expect(keys(state).length - nodes).toBe(1);
		});

	});

	describe('getNode', () => {

		it('should return an added node', () => {
			expect(gridModel.getNode(12, 34)).not.toBeDefined();
			gridModel.addNode(12, 34, "test");
			expect(gridModel.getNode(12, 34)).toBeDefined();
		});

	});

	describe('addNodes', () => {
		it('exists', () => {
			expect(gridModel.addNodes).toBeDefined();
		});
		it('should add nodes to state using a rect and a sample grid', ()=> {
			let rect = new Rect(new Block({x:0,y:0}).center, new Block({x:1,y:3}).center);
			let grid = new Grid({type:'FLOOR', rotation: 0})
			gridModel.addNodes(rect, grid);
			expect(Object.keys(gridModel.state).length).toBe(8);
			let node = gridModel.getNode(0,0);
			expect(node).toBeDefined();
		})

	})

	// describe('getMin', () => {
	//
	//   it('should return an object with min/max x/y', () => {
	//     let min = gridModel.getMin();
	//     expect(min.x).toBeDefined();
	//     expect(min.y).toBeDefined();
	//   });
	//
	//   it('should get the smallest values', () => {
	//     gridModel.addNode(-3,2);
	//     gridModel.addNode(4,3);
	//     gridModel.addNode(8,-1);
	//     gridModel.addNode(5,5);
	//     let min = gridModel.getMin();
	//     expect(min.x).toBe(-3);
	//     expect(min.y).toBe(-1);
	//   });
	//
	// });

	describe('getPath', () => {

		it('should return a path', () => {
			gridModel.addNode(1,1, new Grid({type:'FLOOR'}));
			gridModel.addNode(1,2, new Grid({type:'FLOOR'}));
			gridModel.addNode(2,2, new Grid({type:'FLOOR'}));
			let path = gridModel.getPath({x:1,y:1}, {x:2, y:2});
			// expect(path).toBe([{x:1, y:2},{x:2, y:2}]);
			expect(path[0].x).toBe(1);
			expect(path[0].y).toBe(2);
			expect(path[1].x).toBe(2);
			expect(path[1].y).toBe(2);
		});

		it('should return [end] if start and end are same', () => {
				gridModel.addNode(1,1, new Grid({type:'FLOOR'}));
				let path = gridModel.getPath({x:1,y:1}, {x:1, y:1});
				expect(path[0].x).toBe(1);
				expect(path[0].y).toBe(1);
		});

	});

	describe('cacheObject', () => {
		it('definde', () => {
			expect(gridModel.cacheObject).toBeDefined();
		});
		it('should cache an object', () => {
			gridModel.addNode(0,0, new Grid({type:'FLOOR'}))
			gridModel.addNode(1,0, new Grid({type:'FLOOR'}))
			gridModel.addNode(1,1, new Grid({type:'FLOOR'}))
			gridModel.addNode(0,1, new Grid({type:'FLOOR'}))

			let obj = new Obj({block:new Block({x:0, y:1}), type:'FRIDGE'})
			gridModel.cacheObject(obj)
			//getObject() saved for integration test
			expect(gridModel.getNode(0,0).object).not.toBeDefined();
			expect(gridModel.getNode(1,0).object).not.toBeDefined();
			expect(gridModel.getNode(0,1).object).toBeDefined();
			expect(gridModel.getNode(1,1).object).toBeDefined();

		})

	})

});
