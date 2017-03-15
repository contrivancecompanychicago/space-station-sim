
import CharController from './Character';
import state from 'Game/state'

let charController;
describe('Game/Controller/Character', () => {
	beforeEach(() => {
		state.init();
		charController = new CharController();
	})
	describe('update', ()=>{
		it('should call newaction if no action', () => {
			state.character.addChar({});
			charController.newAction = jest.fn();
			charController.update();
			expect(charController.newAction).toHaveBeenCalled()
		})
	})
	describe('spawnUpdate', ()=>{
		it('', () => {
			
		})
	})
	describe('newAction', ()=>{
		it('', () => {
			
		})
	})

})