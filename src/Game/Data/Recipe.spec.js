import RecipeData from './Recipe'
let sample;

describe('Game/Data/Recipe', () => {
	beforeEach(() => {
		sample = RecipeData.get('GARLIC')
	})
	it('should be datamap', () => {
		expect(RecipeData.put).toBeDefined();
	})
	describe('ingredients', () => {
		it('should be defined', () => {
			expect(sample.ingredients).toBeDefined();
		})
		it('should contain ingredient', () => {
			expect(sample.ingredients.indexOf('GARLIC') >-1).toBe(true);
		})
	})
})