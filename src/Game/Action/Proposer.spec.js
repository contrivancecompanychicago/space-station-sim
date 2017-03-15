
// import {selection} from 'Game/Model/View';

import selection from 'Game/selection'
// import Proposer, {blockHasObject} from 'Game/Action/Proposer';
import * as props from 'Game/Action/Proposer';
import {keys} from 'lodash';
import Point from 'Game/Point';
import Block from 'Game/Block'

import globalstate, {State} from 'Game/state'

const Proposer = props.default

let proposer = new Proposer();
let state;
describe('Game/Action/Proposer', () => {
	beforeAll(()=>{
		globalstate.init()
	})

	describe('Grid', () => {
		beforeEach(() => {
			state = new State();
			state.init();
			state.ui.state = {mode:'GRID',grid:'FLOOR'};
			state.view.state.selection = selection({x:1, y:1}, {x:100, y:100});
			Point.registerState(state);
		});
		it('should return a grid object', () => {
			let p = proposer.propose(state);
			expect(p.grid).toBeDefined();
			expect(p.grid.getNode(0,0)).toBeDefined();
		});
		it('should not overwrite existing blocks of same type', () => {
			state.grid.state = {'0_0':'FLOOR'};
			let p = proposer.propose(state);
			expect(p.grid['0_0']).not.toBeDefined();
		});
		describe('unselected', () => {
			it('should return object under mouse', () => {
				state.ui.state.mode = 'GRID';
				state.view.state.selection = null;
				let p = proposer.propose(state);
				expect(p.grid.getNodes().length).toBe(1);
			})
		})
	});
	describe('object', () => {
		beforeEach(() => {
			state.init();
			state.ui.state = {mode:'OBJECT',grid:'FLOOR', object:'TEST'}
		})
		describe('selection', () => {
			beforeEach(() => {
				state.view.state.selection = selection({x:1, y:1}, {x:100, y:100}, 0);
			})
			it('should return no objects because no blocks', () => {
				// expect(props.blockHasObject).toBeDefined();
				// props.blockHasObject = jest.fn().mockReturnValue(true)
				state.object.getObjectAtBlock = jest.fn().mockReturnValue(true)
				let p = proposer.propose(state);
				expect(p.object.getObjects().length).toBe(16);
			})
		})
		describe('unselected', () => {
			beforeEach(() => {
				state.view.state.selection = null;
				state.view.state.mousePosition = new Point(0,0);
			})
			it('should return an object under the mouse', () => {
				let p = proposer.propose(state);
				expect(keys(p.object.state).length).toBe(1);
			});
		});
	});
});
