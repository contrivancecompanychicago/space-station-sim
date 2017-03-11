
import Character from './Character';

import Item from 'Game/Type/Item'
import Point from 'Game/Point'

describe('Game/Type/Character', () => {
	it('should fill in the ID', () => {
		let c = new Character({});
		expect(c.id).toBeDefined();
	});
	it('should copy over firstname lastname', () => {
		let c = new Character({ firstname: "James", lastname: "Smith" });
		expect(c.firstname).toBe('James');
		expect(c.lastname).toBe('Smith');
	});

	describe('items', () => {
		it('should add', () => {
			let c = new Character();
			let item = new Item({ position: new Point(1, 2), type: 'PIZZA' })
			c.addItem(item)
			expect(c.item.length).toBe(1);

		})
		it('should remove from list', () => {
			let c = new Character();
			let item1 = new Item({ position: new Point(1, 2), type: 'PIZZA' })
			let item2 = new Item({ position: new Point(3, 4), type: 'TEST' })
			let item3 = new Item({ position: new Point(5, 6), type: 'COFFEE' })
			c.addItem(item1)
			c.addItem(item2)
			c.addItem(item3)
			expect(c.item.length).toBe(3);
			c.removeItem(item2);
			expect(c.item.length).toBe(2);
			//test functions in integration
			expect(c.item[0]).toBe(item1.id);
			expect(c.item[1]).toBe(item3.id);
		})
		it('should wipe', () => {
			let c = new Character();
			let item1 = new Item({ position: new Point(1, 2), type: 'PIZZA' })
			let item2 = new Item({ position: new Point(3, 4), type: 'TEST' })
			let item3 = new Item({ position: new Point(5, 6), type: 'COFFEE' })
			c.item.forEach((item) => {
				c.removeItem(item)
			})
			expect(c.item.length).toBe(0)

		})
	})

	let c = new Character({});
	describe('recipes', () => {
		beforeEach(() => {
			c = new Character({});
		})
		describe('getRecipe', () => {
			it('should exist', () => {
				expect(c.getRecipe).toBeDefined();
			})
			it('should return a recipe object', () => {
				let r = c.getRecipe('GARLIC');
				expect(r.level).toBeDefined();
				expect(r.experience).toBeDefined();
			})
		})

		describe('hasRecipe', () => {
			it('shuld exist', () => {
				expect(c.hasRecipe).toBeDefined();
			})
			it('negative if level = 0', () => {
				
				expect(c.hasRecipe('GARLICCHEESE')).toBe(false);
			})
			it('positive if level > 0', () => {
				c.addRecipe('GARLIC');
				expect(c.hasRecipe('GARLIC')).toBe(true);
			})
		})

		describe('addRecipeExperience', () => {
			it('should be defined', () => {
				expect(c.addRecipeExperience).toBeDefined();

			})
			it('should increase the recipe exp by given amount', () => {
				
				let r = c.getRecipe('GARLIC');
				let start = r.experience;
				let amount = 20;
				c.addRecipeExperience('GARLIC', amount);
				let end = c.getRecipe('GARLIC').experience;
				expect(end).toBe(start+amount);
			});
			it('should level up', () => {
				let start = c.getRecipe('GARLIC').level;
				let amount = 100;
				c.addRecipeExperience('GARLIC', amount);
				let end = c.getRecipe('GARLIC').level;
				expect(end).toBe(start+1);
			})
		})

	})
});
