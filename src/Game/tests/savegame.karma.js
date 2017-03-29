// @flow

import Game from 'Game';

import mouse from './mouseTestUtil'

import testGen from 'jasmine-es6-generator'
import Block from 'Game/Block'

import dispatcher from 'Game/Action/Dispatcher';

let gap = 20;
function sleep(ms) {
	game.engine.fastForward(gap)
	return Promise.resolve()
	// return new Promise(resolve => setTimeout(resolve, ms));
}

let container: HTMLDivElement;
let canvas;
let game: Game
describe('savegame.karma.js', () => {
	beforeAll(function () {
		
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 2*1000;
		container = document.createElement('div');
		container.style = 'position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%';
		document.body.appendChild(container)
		game = new Game(container);
	})
	afterAll(function () {
		game.destroy();
		document.body.removeChild(container)
	})

	describe('initialized', () => { //TODO: move this to functional
		it('should have a canvas', ()=> {
			canvas = container.getElementsByTagName('canvas')[0];
			expect(canvas).toBeDefined();
			mouse.setCanvas(canvas);
		})
		
	})
	describe('setup', () => {
		it('close save panel', () => {
			mouse.clickSelector('.save.panel .close')
		});
		it('select grid', () => {
			expect(mouse.clickSelector('.button-mode-grid')).toBe(true);
		});
		it('select grid > FLOOR', () => {
			expect(mouse.clickSelector('.button-grid-FLOOR')).toBe(true);
		});
		// it('wait', done => {setTimeout(done, 100)});
		it('draw blocks', () => {
			let fromBlock = new Block({x:0, y:0})
			let toBlock = new Block({x:16, y:16})
			spyOn(dispatcher, 'userAction').and.callThrough();
			mouse.canvasMouseDown(fromBlock.center.screen)
			mouse.canvasMouseUp(toBlock.center.screen)
			expect(dispatcher.userAction).toHaveBeenCalled();
		});
		it('should make coffeemachine', () => {
			expect(mouse.clickSelector('.button-mode-object')).toBe(true)
			expect(mouse.clickSelector('.button-object-COFFEEMACHINE')).toBe(true)
			mouse.canvasClickBlock(new Block({ x: 6, y: 3 }))
		});
		it('should make chair', () => {
			expect(mouse.clickSelector('.button-object-CHAIRIMAGESET')).toBe(true)
			mouse.canvasClickBlock(new Block({ x: 6, y: 9 }))
		})
		it('should make spawn', () => {
			expect(mouse.clickSelector('.button-object-TEST')).toBe(true)
			mouse.canvasClickBlock(new Block({ x: 12, y: 3 }));
		})
	})
	// it('wait', done => {setTimeout(done, 100)});
	it('should spawn customer', () => {
		game.state.character.spawnCustomer();
	})
	it('should speed up game', () => {
		expect(mouse.clickSelector('.button-speed-fast')).toBe(true)
	})
	it('should spawn customer and get order', testGen(function* () {
		while (game.state.order.getOrders().length == 0) {
			// debugger;
			// game.engine.fastForward(gap)
			yield sleep(gap)
		}
	}));
	describe('save and reload', () => {
		it('open panel menu', () => {
			expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
		})
		it('open save panel', () => {
			expect(mouse.clickSelector('.button-panel-save')).toBe(true)
		})
		it('press save', () => {
			expect(mouse.clickSelector('.save.panel button#save')).toBe(true)
		})
		it('press load', () => {
			expect(mouse.clickSelector('button#load-savename')).toBe(true)
		})
		it('wait', (done) => {
			setTimeout(done, 100);
			mouse.clickSelector('.save.panel .close')
		})
	});

	it('character should not reorder after load', () => {
		expect(game.state.order.getOrders().length).toBe(2);
	})



	let worker
	it('should hire a worker', testGen(function* () {
		expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
		expect(mouse.clickSelector('.button-panel-hiring')).toBe(true)
		yield sleep(gap);
		expect(mouse.clickSelector('.hireable button')).toBe(true)
		mouse.clickCheckbox('label.task-MAKEDRINK input')
		worker = game.state.ui.state.selected[0];

		mouse.clickSelector('.hiring.panel .close')
		expect(mouse.clickSelector('.selected .close')).toBe(true)
		expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
		expect(mouse.clickSelector('.button-panel-orders')).toBe(true)

		expect(worker).toBeDefined();
	}))
	let order
	let orders
	describe('making drink saving state', () => {
		it('should wait for order to get a worker', testGen(function* () {
			orders = game.state.order.getOrders()
			order = orders.filter((o) => {
				return o.type == 'COFFEE'
			})[0]
			expect(order).toBeDefined();
			
			expect(order.getWorker()).not.toBeDefined();
			// while (order.status != 'STARTED') {
			while (!order.getWorker()){
				yield sleep(gap);
			}
		}))

		describe('save and reload', () => {
			it('open panel menu', () => {
				expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
			})
			it('open save panel', () => {
				expect(mouse.clickSelector('.button-panel-save')).toBe(true)
			})
			it('press save', () => {
				expect(mouse.clickSelector('.save.panel button#save')).toBe(true)
			})
			it('wait', (done) => {
				setTimeout(done, 20);
			})
			it('press load', () => {
				expect(mouse.clickSelector('button#load-savename')).toBe(true)
			})
			it('wait', (done) => {
				setTimeout(done, 10);
				mouse.clickSelector('.save.panel .close')
			})
		})

		it('should continue the order', testGen(function* () {
			let old = order;
			let oldOrders = orders;

			orders = game.state.order.getOrders()
			order = orders.filter(o => {
				return o.id == old.id
			})[0]

			expect(order).toBeDefined();

			// order = game.state.order.get
			while (!order.getItem()) {
				yield sleep(gap);
			}
		}))
	})
	describe('serving drink saving state', () => {

		describe('save and reload', () => {
			it('open panel menu', () => {

				expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
				expect(game.state.ui.state.mode).toBe('PANEL')
			})
			it('wait', (done) => { setTimeout(done, gap); })
			it('open save panel', () => {
				expect(mouse.clickSelector('.button-panel-save')).toBe(true)
				expect(game.state.ui.state.panel.save.show).toBe(true)
			})
			it('wait', (done) => { setTimeout(done, gap); })
			it('press save', () => {
				expect(mouse.clickSelector('.save.panel button#save')).toBe(true)
			})
			it('wait', (done) => {
				setTimeout(done, 50);
			})
			it('press load', () => {
				expect(mouse.clickSelector('button#load-savename')).toBe(true)
			})
			it('wait', (done) => {
				setTimeout(done, 10);
				mouse.clickSelector('.save.panel .close')
			})
		})
		it('should continue the order', testGen(function* () {

			orders = game.state.order.getOrders()
			order = orders.filter(o => {
				return o.id == order.id
			})[0]

			while (order.status != 'FULFILLED') {
				yield sleep(gap);
			}
		}))
	})

	it('should make pizza objects', testGen(function* () {
		mouse.clickSelector('.button-mode-object')
		yield sleep(gap);
		expect(mouse.clickSelector('.button-object-FRIDGETALL')).toBe(true)
		yield sleep(gap);
		mouse.canvasClickBlock(new Block({ x: 7, y: 3 }))
		yield sleep(gap);
		expect(mouse.clickSelector('.button-object-STONEOVEN')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 4, y: 3 }))
		yield sleep(gap);
		expect(mouse.clickSelector('.button-object-TABLEROUND')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 9, y: 9 }))
	}))
	it('should slow down', () => {
		// expect(mouse.clickSelector('.button-speed-normal')).toBe(true)
	})
	it('should select worker', () => {
		worker = game.state.character.getChar(worker.id);
		expect(worker).toBeDefined();
		expect(mouse.clickSelector('.button-mode-select')).toBe(true)

		let point = worker.position.screen;
		mouse.canvasMouseMove(point);
		mouse.canvasClick(point);
		expect(game.state.ui.state.selected[0]).toBe(worker)
	})
	it('should set worker to make food', () => {
		
		mouse.clickCheckbox('label.task-MAKEDRINK input')
		mouse.clickCheckbox('label.task-MAKE input')
	});
	describe('making a pizza', () => {
		it('should have an order', () => {
			orders = game.state.order.getOrders();
			expect(orders.length).toBe(1);
			order = orders[0];
			expect(order.type).toBe('PIZZA');
		})
		// it('shouldnt have a worker now', () => {
		// 	expect(order.getWorker()).not.toBeDefined();
		// })
		it('should wait for the worker to pick up the order', testGen(function* () {
			while(!order.getWorker()){
				yield sleep(gap)
			}
			expect(order.getWorker()).toBe(worker);
		}));
		it('save and reload', testGen(saveAndReload));
		it('shouldnt have an item yet', () => {
			orders = game.state.order.getOrders();
			order = orders[0];
			expect(order.getItem()).not.toBeDefined();
		})
		it('should wait until the pizza order has an item', testGen(function* () {
			while(!order.getItem()){
				yield sleep(gap)
			}
			expect(order.getItem().type).toBe('BASE')
		}))
		it('save and reload', testGen(saveAndReload));
		it('order should have an item', () => {
			orders = game.state.order.getOrders();
			order = orders[0];
			expect(order.getItem()).toBeDefined();
		})
		it('should turn the order item into pizzauncooked', testGen(function* () {
			let item = order.getItem();
			while(item.type !== 'PIZZAUNCOOKED'){
				yield sleep(gap)
			}
		}))
		it('save and reload', testGen(saveAndReload));
		it('should cook it', testGen(function* () {
			orders = game.state.order.getOrders();
			order = orders[0];
			worker = game.state.character.getChar(worker.id);
			
			let point = worker.position.screen;
			mouse.canvasMouseMove(point);
			mouse.canvasClick(point);
			
			mouse.clickCheckbox('label.task-COOK input')

			expect(order.getWorker()).not.toBeDefined();
			while(!order.getWorker()){
				yield sleep(gap)
			}

		}))
		it('worker should only have one item', () => {
			expect(worker.getItems().length).toBe(1);
		})
		it('save and reload', testGen(saveAndReload));
			
		it('should cook it', testGen(function* () {
			
			expect(mouse.clickSelector('.button-speed-fast')).toBe(true)
			orders = game.state.order.getOrders();
			order = orders[0];
			while(order.getItem().type !== 'PIZZA'){
				yield sleep(gap)
			}
		}))
		
		it('save and reload', testGen(saveAndReload));
		it('should serve it', testGen(function* () {
			orders = game.state.order.getOrders();
			order = orders[0];
			worker = game.state.character.getChar(worker.id);
			
			let point = worker.position.screen;
			mouse.canvasMouseMove(point);
			mouse.canvasClick(point);

			mouse.clickCheckbox('label.task-SERVEFOOD input')
			while(order.status !== 'FULFILLED'){
				yield sleep(gap)
			}

		}))
	})


	it('should wait open', (done) => {
		setTimeout(() => {
			done();
		}, 100)
	})
})

function* saveAndReload () {
	mouse.clickSelector('.selected .close')
	expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
	expect(mouse.clickSelector('.button-panel-save')).toBe(true)
	expect(mouse.clickSelector('.save.panel button#save')).toBe(true)
	yield sleep(20);
	expect(mouse.clickSelector('button#load-savename')).toBe(true)
	yield sleep(gap);
	mouse.clickSelector('.save.panel .close')
}
