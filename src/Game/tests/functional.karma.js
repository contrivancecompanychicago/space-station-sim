// @flow
import { extend, keys, assign } from 'lodash';
import Game from 'Game';
import config from 'Game/config';

import sizzle from 'sizzle';

import testGen from 'jasmine-es6-generator';
import ReactTestUtils from 'react-addons-test-utils';


import Block from 'Game/Block';
import type Grid from 'Game/Type/Grid';
import type Obj from 'Game/Type/Obj';
import type Character from 'Game/Type/Character';

import mouse from './mouseTestUtil';

const tg: (Generator<*,*,*>)=>null = testGen
function sleep(ms) {
	// game.engine.fastForward(ms)
	// return Promise.resolve()
	return new Promise(resolve => setTimeout(resolve, ms));

}

let container: HTMLDivElement;
let game: Game;
let canvas;

let gap = 1

describe('functional.karma.js', () => {

	beforeAll(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10*1000;
		container = document.createElement('div');
		container.style = 'position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%';
		document.body.appendChild(container)
		game = new Game(container);
	});
	afterAll(function () {
		game.destroy();
		document.body.removeChild(container)
	})
	it('should wait to start', (done) => {
		setTimeout(() => {
			canvas = container.getElementsByTagName('canvas')[0];
			mouse.setCanvas(canvas);
			done();
		}, 100)
	})


	it('should load blank', (done) => {
		mouse.clickSelector('button#load-blank');
		setTimeout(done, 100);
	})
	it('should close the savepanel', () => {
		mouse.clickSelector('.save.panel .close')
	})

	it('should click next on the tutorial a few times', (done) => {
		let i = setInterval(() => {
			let tutnext = sizzle('.tutorial button');
			if (tutnext.length > 0) {
				ReactTestUtils.Simulate.click(tutnext[0]);
			} else {
				clearInterval(i);
				done();
			}
		}, gap)
	})
	it('should open grid panel', () => {
		mouse.clickSelector('.button-mode-grid')
		expect(mouse.clickSelector('.button-grid-TILES1')).toBe(true)
	})
	it('should insta-draw some tiles', () => {
		expect(canvas).toBeDefined();
		mouse.mouseEvent(canvas, 'mousedown', { button: 0, pageX: 1, pageY: 1 });
		mouse.mouseEvent(canvas, 'mouseup', { button: 0, pageX: config.grid.width * 10, pageY: config.grid.height * 10 });

	});
	it('should draw some floor', testGen(function* () {
		expect(mouse.clickSelector('.button-grid-FLOOR')).toBe(true)
		yield* mouse.canvasDragRect({ x: 0, y: 0 }, { x: 16, y: 16 });
		let node: Grid = game.state.grid.getNode(0, 0);
		expect(node).toBeDefined();
		expect(node.type).toBe('FLOOR')
		node = game.state.grid.getNode(16, 16);
		expect(node).toBeDefined();
		expect(node.type).toBe('FLOOR')

	}))
	it('should draw some walls', testGen(function* () {
		expect(mouse.clickSelector('.button-grid-WALLTEST')).toBe(true)
		yield* mouse.canvasDragRect({ x: 2, y: 2 }, { x: 2, y: 10 });
		yield* mouse.canvasDragRect({ x: 2, y: 2 }, { x: 10, y: 2 });
		yield* mouse.canvasDragRect({ x: 10, y: 2 }, { x: 10, y: 10 });
	}))

	it('should make some stone oven', testGen(function* () {
		expect(mouse.clickSelector('.button-mode-object')).toBe(true)
		expect(mouse.clickSelector('.button-object-STONEOVEN')).toBe(true)
		mouse.canvasMouseMove(new Block({ x: 3, y: 3 }).center);
		mouse.canvasClickBlock(new Block({ x: 3, y: 3 }))
	}))

	it('should click next on the tutorial a few times', (done) => {
		let i = setInterval(() => {
			let tutnext = sizzle('.tutorial button');
			if (tutnext.length > 0) {
				ReactTestUtils.Simulate.click(tutnext[0]);
			} else {
				clearInterval(i);
				done();
			}
		}, gap)
	})
	it('should make fridge', testGen(function* () {
		expect(mouse.clickSelector('.button-object-FRIDGETALL')).toBe(true)
		mouse.canvasMouseMove(new Block({ x: 6, y: 3 }).center);
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 6, y: 3 }))
	}))
	it('should make another fridge', testGen(function* () {
		mouse.canvasMouseMove(new Block({ x: 8, y: 3 }).center);
		mouse.canvasClickBlock(new Block({ x: 8, y: 3 }))
	}))

	it('should make a prep table', testGen(function* () {
		expect(mouse.clickSelector('.button-object-TABLE3')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 9, y: 3 }))

	}))
	it('should click next on the tutorial a few times', (done) => {
		let i = setInterval(() => {
			let tutnext = sizzle('.tutorial button');
			if (tutnext.length > 0) {
				ReactTestUtils.Simulate.click(tutnext[0]);
			} else {
				clearInterval(i);
				done();
			}
		}, gap)
	})
	it('should make a line of prep table', testGen(function* () {
		mouse.canvasMouseMove(new Block({ x: 9, y: 5 }).center);
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		yield* mouse.canvasDragRect({ x: 9, y: 5 }, { x: 6, y: 5 })

	}))
	it('should make another oven', testGen(function* () {
		expect(mouse.clickSelector('.button-object-STONEOVEN')).toBe(true)
		mouse.canvasMouseMove(new Block({ x: 4, y: 7 }).center);
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		mouse.canvasClickBlock(new Block({ x: 4, y: 7 }))
	}))
	it('should make some serve tables', testGen(function* () {
		expect(mouse.clickSelector('.button-object-TABLE4')).toBe(true)
		mouse.canvasMouseMove(new Block({ x: 6, y: 7 }).center);

		yield* mouse.canvasDragRect({ x: 6, y: 7 }, { x: 9, y: 7 })
	}))

	it('should make some chairs', testGen(function* () {
		expect(mouse.clickSelector('.button-object-CHAIRIMAGESET')).toBe(true)

		mouse.canvasMouseMove(new Block({ x: 5, y: 9 }).center);
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		yield* mouse.canvasDragRect({ x: 5, y: 9 }, { x: 8, y: 9 })
		//COPYPASTA
		mouse.canvasMouseMove(new Block({ x: 5, y: 12 }).center);
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		yield* mouse.canvasDragRect({ x: 5, y: 12 }, { x: 8, y: 12 })

	}));

	it('should make tables', testGen(function* () {
		expect(mouse.clickSelector('.button-object-TABLEROUND')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		yield* mouse.canvasDragRect({ x: 5, y: 10 }, { x: 8, y: 11 })

	}));
	it('should make drink things', testGen(function* () {
		expect(mouse.clickSelector('.button-object-COFFEEMACHINE')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		expect(mouse.clickSelector('button.rotate')).toBe(true)
		yield* mouse.canvasDragRect({ x: 3, y: 8 }, { x: 3, y: 10 })

	}));


	it('should make some spawn point', testGen(function* () {
		expect(mouse.clickSelector('.button-object-TEST')).toBe(true)
		mouse.canvasMouseMove(new Block({ x: 0, y: 3 }).center);
		yield* mouse.canvasDragRect({ x: 0, y: 14 }, { x: 5, y: 16 })
	}))

	it('should wait for a character to spawn', testGen(function* () {

		expect(mouse.clickSelector('.button-mode-select')).toBe(true)

		game.state.character.spawnCustomer();

		while (game.state.character.getChars().length == 0) {
			yield sleep(gap);
		}
		let char = game.state.character.getChars()[0];

		mouse.canvasMouseMove(char.position.screen);
		//select
		mouse.canvasClick(char.position.screen)
		//follow
		expect(mouse.clickSelector('.follow')).toBe(true)
	}));


	it('should speed up time', testGen(function* () {
		expect(mouse.clickSelector('.button-speed-turbo')).toBe(true)
		expect(game.state.ui.state.speed).toBe('TURBO')
	}));


	let order;

	it('should wait for order', testGen(function* () {
		while (game.state.order.getOrders().length == 0) {
			// game.engine.fastForward(gap)
			yield sleep(gap);
		}
		order = game.state.order.getOrders()[0];
	}));

	it('should open hiring panel', testGen(function* () {

		expect(mouse.clickSelector('.selected .close')).toBe(true)
		expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
		expect(mouse.clickSelector('.button-panel-hiring')).toBe(true)
	}));

	let worker: Character;
	let char: Character;

	it('should hire staff', testGen(function* () {
		expect(mouse.clickSelector('.hireable button')).toBe(true)
		worker = game.state.ui.getSelected()[0];
		expect(worker).toBeDefined();
	}));

	it('should slow time', () => {
		expect(mouse.clickSelector('.button-speed-normal')).toBe(true)
	})
	it('should zoom', testGen(function* () {

		for (let i = 0; i < 10; i++) {
			mouse.mouseEvent(canvas, 'mousewheel', { wheelDelta: 10, x: window.innerWidth / 2, y: window.innerHeight / 2 })
		}
	}));

	it('should speed time', () => {
		expect(mouse.clickSelector('.button-speed-turbo')).toBe(true)
	})

	xit('should give him a new path', testGen(function* () { //ADDED CONTEXT MENU
		expect(mouse.clickSelector('.button-mode-select')).toBe(true)
		//right click somewhere
		mouse.canvasClick(new Block({ x: 12, y: 12 }).center.screen, { button: 2 });
		yield sleep(gap);
		let lastblock = worker.path[worker.path.length - 1]
		expect(lastblock.x).toBe(12);
		expect(lastblock.y).toBe(12);
	}));

	it('should right click an object',  testGen(function *() {

		let tablepos = new Block({x:5, y:10});
		let obj = game.state.object.getObjectAtBlock(tablepos);
		expect(obj).toBeDefined();
		let point = tablepos.center.screen;
		// debugger;
		mouse.canvasClick(point, {button: 2});
		// canvasClickBlock(tablepos)
		expect(game.state.ui.state.contextMenu.show).toBe(true);
		expect(game.state.ui.state.contextMenu.character).toBe(worker);
		expect(game.state.ui.state.contextMenu.object).toBe(obj);
		expect(game.state.ui.state.contextMenu.position.x).toBe(point.x);
		expect(game.state.ui.state.contextMenu.position.y).toBe(point.y);

	}));
	it('should mouseLeave and close the menu', () => {
		let el = sizzle('.contextMenu')[0]
		ReactTestUtils.Simulate.mouseLeave(el)
		expect(game.state.ui.state.contextMenu.show).toBe(false);
	})

	let item;
	describe('making base', () => {

		it('should assign make tasks', testGen(function* () {
			mouse.clickCheckbox('label.task-MAKE input')
		}));

		it('shouldnt have a worker', () => {
			expect(order.getWorker()).not.toBeDefined();
		})
		it('shouldnt have an item', () => {
			expect(order.getItem()).not.toBeDefined();
		})
		it('wait to assign a worker', testGen(function* () {
			while (!order.getWorker()) {

				// game.engine.fastForward(gap);
				yield sleep(gap);
			}
		}))

		it('should make an item', testGen(function* () {

			while (!order.getItem()) {
				// game.engine.fastForward(gap)
				yield sleep(gap);
			}
			item = order.getItem();
			expect(item).toBeDefined();
		}));
		it('should be a base', () => {
			expect(item.type).toBe('BASE')
		});

	})
	describe('making pizzauncooked', () => {
		
		it('should wait until its pizzauncooked', testGen(function* () {
			while(item.type !== 'PIZZAUNCOOKED'){
				// game.engine.fastForward(gap)
				yield sleep(gap);
			}
		}))
		it('order shound not have worker', () => {
			expect(order.getWorker()).not.toBeDefined();
		})
		it('item should be resting on an object', () => {
			let obj = game.state.object.getObjectAtBlock(item.position.block)
			expect(obj).toBeDefined();
		})
	});
	describe('making pizza', () => {

		it('should hire cook staff', testGen(function* () {
			yield sleep(gap);
			expect(mouse.clickSelector('.hireable button')).toBe(true)
			worker = game.state.ui.getSelected()[0];
			expect(worker).toBeDefined();
		}));
		it('should assign cook task to new staff', () => {
			mouse.clickCheckbox('label.task-COOK input')
			mouse.clickCheckbox('label.task-EXTRACTOVEN input')
		});
		it('order should not have a worker', () => {
			expect(order.getWorker()).not.toBeDefined();
		});
		it('should get a worker assigned to order', testGen(function* () {
			while (!order.getWorker()) { yield sleep(gap) }
			expect(order.getWorker()).toBe(worker);
		}));
		it('should turn item into a pizza', testGen(function*(){
			while(item.type !== 'PIZZA'){
				// game.engine.fastForward(gap)
				yield sleep(gap)
			}
		}));
		it('should put it onto a table to wait for serving', testGen(function*(){
			while(order.getWorker()){
				// game.engine.fastForward(gap)
				yield sleep(gap)
			}
			let obj:Obj = item.getObject();
			expect(obj.hasAbility('SERVE_TABLE')).toBe(true);
			
		}))

	})

	describe('serving', () => {
		it('should hire serve staff', testGen(function* () {
			yield sleep(gap);
			expect(mouse.clickSelector('.hireable button')).toBe(true)
			worker = game.state.ui.getSelected()[0];
			mouse.clickCheckbox('label.task-SERVEFOOD input')
		}));


		it('should serve the order', testGen(function* () {
			while (order.status !== 'FULFILLED') {
				yield sleep(gap);
			}
			expect(order.status).toBe('FULFILLED');
		}));
	})



	it('should have a drink order somewhere', () => {
		order = game.state.order.state[0];
		expect(order.type).toBe('COFFEE');
	})

	it('should hire drink staff', testGen(function* () {

		expect(mouse.clickSelector('.hireable button')).toBe(true)
		yield sleep(gap);
		worker = game.state.ui.getSelected()[0];
	}));

	// it('should manually assign drink task', testGen(function* () {
	// 	mouse.canvasClick(new Block({ x: 3, y: 8 }).center.screen, { button: 2 });
	// 	// yield sleep(gap);
	// 	game.engine.fastForward(gap);
	// 	let lastblock = worker.path[worker.path.length - 1]
	// 	expect(lastblock.y).toBe(8);
	// }));
	it('should autoserve drinks', () => {
		mouse.clickCheckbox('label.task-MAKEDRINK input')
	})
	it('should serve the drink', testGen(function* () {
		while (order.status !== 'FULFILLED') {
			yield sleep(gap);
		}
		expect(order.status).toBe('FULFILLED');

	}));

	it('clean up panels', () => {
		mouse.clickSelector('.hiring.panel .close')
		expect(mouse.clickSelector('.selected .close')).toBe(true)
		mouse.clickSelector('.tutorial button')

	})


	describe('save and load', () => {
		beforeAll(() => {
			mouse.clickSelector('.button-speed-normal')
			mouse.clickSelector('.button-mode-panels')
			mouse.clickSelector('.button-panel-save')

		})
		afterAll(() => {
			// game.state.clear();
		})
		it('should save', (done) => {
			let saveinput = sizzle('.save.panel input')[0];
			saveinput.value = 'functional';
			ReactTestUtils.Simulate.change(saveinput);//unnecessary?
			expect(mouse.clickSelector('.save.panel button#save')).toBe(true)
			expect(localStorage['save_functional']).toBeDefined();
			setTimeout(done, 100);
		})
		xit('should load stock', (done) => {
			mouse.clickSelector('button#load-large');
			setTimeout(done, 100);
		})
		it('should load functionalagain', (done) => {
			mouse.clickSelector('button#load-functional');
			setTimeout(done, 200);
		})
		it('shuld have the same character with a responsibility', (done) => {
			let c1 = (game.state.character.getChar(worker.id))
			let c2 = (worker);
			expect(c1.id).toBe(c2.id)

			setTimeout(done, 200);
		})

	})



	// it('should wait open', (done) => {
	// 	setTimeout(() => {
	// 		done();
	// 	}, 1000)
	// })

})
