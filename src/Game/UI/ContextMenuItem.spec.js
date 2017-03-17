import ContextMenuItem from './ContextMenuItem'
describe('ContextMenuItem', () => {
	it('should exist', () => {
		expect(ContextMenuItem).toBeDefined();
	});
	it('should have a render after instantiation', () => {
		let c = new ContextMenuItem()
		expect(c.render).toBeDefined();
	})
})