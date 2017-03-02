import state, {State} from 'Game/state'

describe('Game/state integration', () => {
	beforeEach(() => {
		state.init();
	})
	it('should have top level models', () => {
		expect(state.grid).toBeDefined();
	})
})