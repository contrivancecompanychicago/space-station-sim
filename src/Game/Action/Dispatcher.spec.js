
import state from 'Game/state';
// import {selection} from 'Game/Model/View';
import selection from 'Game/selection'

import {Mode} from 'Game/Data/Mode';

import {Dispatcher} from 'Game/Action/Dispatcher';
var dispatcher;
let testSelection
describe('Game/Action/Dispatcher', () => {
	beforeEach(() => {
		state.init();
		dispatcher = new Dispatcher();
		testSelection = selection({x:0, y:0}, {x:0, y:0}, 0)
	});
	it('should be defined', () => {
		expect(dispatcher).toBeDefined();
	})
	describe('uesrAction', () => {
		describe('select', () => {
			beforeEach(() => {
				state.ui.state.mode = Mode.SELECT
			})
			it('assumptions', () => {
				expect(state).toBeDefined();
				expect(state.character).toBeDefined();
			})
			it('should look for char on leftmouse', () => {
				state.character.getClosestCharacterToPoint = jest.fn()
				dispatcher.userAction(testSelection);
				expect(state.character.getClosestCharacterToPoint).toHaveBeenCalled();
			})
		})
		describe('grid', () => {
			beforeEach(() => {
				state.ui.state.mode = Mode.GRID
			})
			it('should addnodes on left mouse', () => {
				state.grid.addNodes = jest.fn();
				dispatcher.userAction(testSelection);
				expect(state.grid.addNodes).toHaveBeenCalled();
			})
			it('should removenodes on right mouse', () => {
				state.grid.removeNodes = jest.fn();
				testSelection.button = 2
				dispatcher.userAction(testSelection);
				expect(state.grid.removeNodes).toHaveBeenCalled();
			})
		})
		describe('object', () => {
			beforeEach(() => {
				state.ui.state.mode = Mode.OBJECT
			})
			it('should mergeState on left mouse', () => {
				state.object.mergeState = jest.fn();
				dispatcher.userAction(testSelection);
				expect(state.object.mergeState).toHaveBeenCalled();
			})
			it('should delete on right mouse', () => {
				state.object.deleteObject = jest.fn();
				state.object.getObjectAtBlock = jest.fn().mockReturnValue(true);
				testSelection.button = 2
				dispatcher.userAction(testSelection);
				expect(state.object.deleteObject).toHaveBeenCalled();
			})
		})

	})

});
