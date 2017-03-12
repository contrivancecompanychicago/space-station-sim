// @flow

import Game from 'Game';

import mouse from './mouseTestUtil'

import testGen from 'jasmine-es6-generator'
import Block from 'Game/Block'

let gap = 200;
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let container: HTMLDivElement;
let canvas;
let game: Game
fdescribe('saving and loading game', () => {
	beforeAll(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
		container = document.createElement('div');
		container.style = 'position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%';
		document.body.appendChild(container)
		game = new Game(container);
	})
	it('should wait to start', (done) => {
		setTimeout(() => {
			canvas = container.getElementsByTagName('canvas')[0];
			mouse.setCanvas(canvas);
			done();
		}, 100)
	})
	it('should set up', testGen(function* () {

		mouse.clickSelector('.save.panel .close')
		//grid
		expect(mouse.clickSelector('.button-mode-grid')).toBe(true)
		expect(mouse.clickSelector('.button-grid-FLOOR')).toBe(true)
		yield* mouse.canvasDragRect({ x: 0, y: 0 }, { x: 16, y: 16 });
		//objects
		expect(mouse.clickSelector('.button-mode-object')).toBe(true)
		expect(mouse.clickSelector('.button-object-DRAWERS')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 6, y: 3 }))
		expect(mouse.clickSelector('.button-object-CHAIR2')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 6, y: 9 }))
		expect(mouse.clickSelector('.button-object-TEST')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 12, y: 3 }));

	}))
	it('should spawn customer and get order', testGen(function* () {
		game.state.character.spawnCustomer();
		expect(mouse.clickSelector('.button-speed-fast')).toBe(true)
		while (game.state.order.getOrders().length == 0) {
			yield sleep(gap);
		}
		expect(mouse.clickSelector('.button-speed-normal')).toBe(true)
		// order = game.state.order.getOrders()[0];
	}))
	let char
	it('should hire a worker', testGen(function* () {
		expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
		expect(mouse.clickSelector('.button-panel-hiring')).toBe(true)
		expect(mouse.clickSelector('.hireable button')).toBe(true)
		mouse.clickCheckbox('label.task-SERVEDRINK input')
		char = game.state.ui.state.selected[0];

		yield sleep(gap);
		mouse.clickSelector('.hiring.panel .close')
		expect(mouse.clickSelector('.selected .close')).toBe(true)
		expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
		expect(mouse.clickSelector('.button-panel-orders')).toBe(true)

		expect(char).toBeDefined();
	}))
	let order
	describe('making drink saving state', () => {
		let orders
		it('should wait for order to turn into STARTED', testGen(function* () {
			orders = game.state.order.getOrders()
			order = orders.filter((o) => {
				return o.type == 'COFFEE'
			})[0]
			expect(order).toBeDefined();
			while (order.status != 'STARTED') {
				yield sleep(gap);
			}
		}))
		it('should save and reload', (done) => {
			mouse.clickSelector('.button-mode-panels')
			mouse.clickSelector('.button-panel-save')
			expect(mouse.clickSelector('.save.panel button#save')).toBe(true)
			mouse.clickSelector('button#load-savename');
			setTimeout(done, 1000);
		});
		it('should continue the order', testGen(function* () {
			let old = order;
			let oldOrders = orders;

			orders = game.state.order.getOrders()
			order = orders.filter(o => {
				return o.id == old.id
			})[0]

			expect(order).toBeDefined();

			// order = game.state.order.get
			while (order.status != 'COOKED') {
				yield sleep(gap);
			}
		}))
	})
	describe('serving drink saving state', () => {

		it('should save and reload', (done) => {
			mouse.clickSelector('.button-mode-panels')
			mouse.clickSelector('.button-panel-save')
			expect(mouse.clickSelector('.save.panel button#save')).toBe(true)
			mouse.clickSelector('button#load-savename');
			setTimeout(done, 1000);
		});
		it('should continue the order', testGen(function* () {
			while (order.status != 'FULFILLED') {
				yield sleep(gap);
			}
		}))
	})

	it('should make pizza shit', testGen(function* () {
		mouse.clickSelector('.button-mode-object')
		yield sleep(gap);
		expect(mouse.clickSelector('.button-object-FRIDGETALL')).toBe(true)
		yield sleep(gap);
		mouse.canvasClickBlock(new Block({ x: 7, y: 3 }))
	}))


	it('should wait open', (done) => {
		setTimeout(() => {
			done();
		}, 1000)
	})
})