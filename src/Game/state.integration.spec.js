import state, {State} from 'Game/state'

import Block from 'Game/Block';
import Rect from 'Game/Rect';

describe('Game/state integration', () => {
	beforeEach(() => {
		state.init();
	})
	it('should have top level models', () => {
		expect(state.grid).toBeDefined();
	});

	it('should have grid nodes find objects', () => {
		let start = new Block(0,0).center;
		let end = new Block(0,3).center;
		state.grid.addNodes({rect: new Rect(start, end)}, 'FLOOR')
		expect(state.grid.getNode(0,0)).toBe('block')
	})


})