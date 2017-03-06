// @flow
import {values} from 'lodash'

import state, {State} from 'Game/state'

import Block from 'Game/Block';
import Rect from 'Game/Rect';
import Grid from 'Game/Type/Grid'

import Obj from 'Game/Type/Object'

describe('Game/state integration', () => {
	beforeEach(() => {
		state.init();
	})
	it('should have top level models', () => {
		expect(state.grid).toBeDefined();
	});

	describe('grid object integration', () => {

		beforeEach(() => {
			let start = new Block({x: 0, y: 0}).center;
			let end = new Block({x: 1, y: 3}).center;
			state.grid.addNodes(new Rect(start, end), new Grid({type:'FLOOR', rotation:0}))

		})
		it('sohuld set up tests proper-like', () => {
			expect(Object.keys(state.grid.state).length).toBe(8);
			let node = state.grid.getNode(0,0);
			expect(node.type).toBe('FLOOR');
			node = state.grid.getNode(1,3);
			expect(node.type).toBe('FLOOR');
		})

		it('should lookup obj from node', () => {
			let obj = new Obj({block:new Block({x:0, y:0}), type:'FRIDGE'});
			state.object.addObject(obj)
			let node = state.grid.getNode(0,0);
			expect(node.getObject()).toBe(obj);

		})
	})

})