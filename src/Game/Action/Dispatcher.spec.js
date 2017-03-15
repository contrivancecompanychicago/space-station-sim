
import state from 'Game/state';
import {selection} from 'Game/Model/View';


import {Dispatcher} from 'Game/Action/Dispatcher';
var dispatcher;
describe('Game/Action/Dispatcher', () => {
	beforeEach(() => {
		dispatcher = new Dispatcher();
	});
	it('should be defined', () => {
		expect(dispatcher).toBeDefined();
	})
	describe('uesrAction', () => {
		describe('select', () => {
			it('assumptions', () => {
				expect(state).toBeDefined();
			})
			it('should look for char on leftmouse', () => {
				state.character.getClosestCharacterToPoint = jest.fn()
				dispatcher.userAction(selection(start:{x:0, y:0}, end:{x:0, y:0}, button:0));
				expect(state.character.getClosestCharacterToPoint).toHaveBeenCalled();
			})
		})

	})

});
