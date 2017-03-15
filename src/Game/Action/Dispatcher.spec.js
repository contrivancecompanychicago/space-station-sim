
import state from 'Game/state';
// import {selection} from 'Game/Model/View';
import selection from 'Game/selection'


import {Dispatcher} from 'Game/Action/Dispatcher';
var dispatcher;
describe('Game/Action/Dispatcher', () => {
	beforeEach(() => {
		state.init();
		dispatcher = new Dispatcher();
	});
	it('should be defined', () => {
		expect(dispatcher).toBeDefined();
	})
	describe('uesrAction', () => {
		describe('select', () => {
			it('assumptions', () => {
				expect(state).toBeDefined();
				expect(state.character).toBeDefined();
			})
			it('should look for char on leftmouse', () => {
				state.character.getClosestCharacterToPoint = jest.fn()
				dispatcher.userAction(selection({x:0, y:0}, {x:0, y:0}, 0));
				expect(state.character.getClosestCharacterToPoint).toHaveBeenCalled();
			})
		})

	})

});
