// @flow

import Game from 'Game';

import mouse from './mouseTestUtil'

import testGen from 'jasmine-es6-generator'
import Block from 'Game/Block'
import dispatcher from 'Game/Action/Dispatcher'
import sizzle from 'sizzle'

let gap = 20;
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
let contextGap = 500;

let container: HTMLDivElement;
let canvas;
let game: Game

describe('givingorders.karma.js', () => {
	beforeAll(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;
		container = document.createElement('div');
		container.style = 'position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%';
		document.body.appendChild(container)
		game = new Game(container);
	})
	afterAll(function () {
		game.destroy();
		document.body.removeChild(container)
	})
	it('should wait to start', (done) => {
		// setTimeout(() => {
		canvas = container.getElementsByTagName('canvas')[0];
		expect(canvas).toBeDefined();
		mouse.setCanvas(canvas);
		done();
		// }, 100)
	})
	
	it('should load blank', (done) => {
		mouse.clickSelector('button#load-blank');
		setTimeout(done, 100);
	})

	it('draw blocks', () => {
		expect(mouse.clickSelector('.button-mode-grid')).toBe(true)
		expect(mouse.clickSelector('.button-grid-FLOOR')).toBe(true)
		let fromBlock = new Block({ x: 0, y: 0 })
		let toBlock = new Block({ x: 16, y: 16 })
		spyOn(dispatcher, 'userAction').and.callThrough();
		mouse.canvasMouseDown(fromBlock.center.screen)
		mouse.canvasMouseUp(toBlock.center.screen)
		expect(dispatcher.userAction).toHaveBeenCalled();
	});
	let coffeemachineBlock = new Block({ x: 8, y: 3 })
	let tableBlock = new Block({ x: 6, y: 3 })
	let ovenBlock = new Block({ x: 3, y: 3 })
	let fridgeBlock = new Block({ x: 6, y: 6 })
	let chairBlock = new Block({ x: 6, y: 9 })
	let spawnBlock = new Block({ x: 12, y: 3 })
	describe('setup', () => {


		// it('should speed up time', testGen(function* () {
		// 	expect(mouse.clickSelector('.button-speed-turbo')).toBe(true)
		// 	expect(game.state.ui.state.speed).toBe('TURBO')
		// }));
		

		it('right mode', testGen(function* () {

			mouse.clickSelector('.save.panel .close')
			//grid
			// yield* mouse.canvasDragRect({ x: 0, y: 0 }, { x: 16, y: 16 });
			//objects
			expect(mouse.clickSelector('.button-mode-object')).toBe(true)

		}))

		it('click STONEOVEN', () => {
			expect(mouse.clickSelector('.button-object-STONEOVEN')).toBe(true)
			mouse.canvasClickBlock(ovenBlock)
		})
		it('click FRIDGETALL', () => {
			expect(mouse.clickSelector('.button-object-FRIDGETALL')).toBe(true)
			mouse.canvasClickBlock(fridgeBlock)
		})
		it('click COFFEEMACHINE', () => {
			expect(mouse.clickSelector('.button-object-COFFEEMACHINE')).toBe(true)
			mouse.canvasClickBlock(coffeemachineBlock)
		})
		it('click TABLEROUND', () => {
			expect(mouse.clickSelector('.button-object-TABLEROUND')).toBe(true)
			mouse.canvasClickBlock(tableBlock)
		})
		it('click chair', () => {
			expect(mouse.clickSelector('.button-object-CHAIRIMAGESET')).toBe(true)
			mouse.canvasClickBlock(chairBlock)

		})
		it('click test', () => {
			expect(mouse.clickSelector('.button-object-TEST')).toBe(true)
			mouse.canvasClickBlock(spawnBlock);

			game.engine.fastForward(gap);

		})


	})
	let worker
	it('should spawn worker', () => {
		expect(mouse.clickSelector('.button-mode-panels')).toBe(true)
		expect(mouse.clickSelector('.button-panel-hiring')).toBe(true)
		expect(mouse.clickSelector('.hireable button')).toBe(true)
		worker = game.state.ui.state.selected[0];
		expect(worker).toBeDefined();
	});

	it('should right click on empty space and open context menu', () => {
		expect(mouse.clickSelector('.button-mode-select')).toBe(true)
		mouse.canvasClick(new Block({ x: 8, y: 8 }).center.screen, { button: 2 });
		expect(sizzle('.contextMenu').length).toBe(1);
		// debugger;
	})

	it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })

	it('should click walk', () => {
		expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
	})

	it('should have path set', () => { //removed when context menu added
		game.engine.fastForward(gap)//give him a frame to figure it out
		let lastblock = worker.path[worker.path.length - 1]
		expect(lastblock.x).toBe(8);
		expect(lastblock.y).toBe(8);
	})

	it('close hiring panel', () => {
		mouse.clickSelector('.hiring.panel .close')
	})

	it('sohuld walk there', testGen(function* () {
		while (worker.path.length > 0) {
			yield sleep(gap)
		}
	}))

	let item
	describe('making item from nothing', () => {

		it('should right click and open context menu', () => {
			expect(mouse.clickSelector('.button-mode-select')).toBe(true)
			//right click somewhere
			mouse.canvasClick(new Block(coffeemachineBlock).center.screen, { button: 2 });
			expect(game.state.ui.state.contextMenu.show).toBe(true);
			expect(sizzle('.contextMenu').length).toBe(1);
		})

		it('should click fridge', () => {
			mouse.canvasClick(new Block(fridgeBlock).center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);

		})
		it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })

		it('should click start cooking', () => {
			expect(mouse.clickSelector('.contextMenuItem-STARTCOOK')).toBe(true)
		});
		it('should hide context menu', () => {
			expect(sizzle('.contextMenu').length).toBe(0);
		})

		it('should have path set to fridge', () => {
			game.engine.fastForward(gap)
			let lastblock = worker.path[worker.path.length - 1]
			expect(lastblock.x).toBe(fridgeBlock.x);
			expect(lastblock.y).toBe(fridgeBlock.y + 1);
		});

		it('sohuld walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
			// yield(sleep(4000))
		}))
		it('should get an item', testGen(function* () {
			while (worker.getItems().length == 0) {
				yield sleep(gap)
			}
			item = worker.getItems()[0];
		}))
		it('should have an item', () => {
			expect(item.type).toBe('BASE')
		})
		it('should turn it into pizzauncooked', testGen(function* () {
			while (item.type !== 'PIZZAUNCOOKED') {
				yield sleep(gap)
			}
		}))
	})


	describe('walk away again', () => {
		it('context menu', testGen(function* () {
			mouse.canvasClick(new Block({ x: 8, y: 6 }).center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	});

	describe('clicking item', () => {
		it('should right click on item to make context menu appear', () => {
			mouse.canvasClick(item.position.screen, { button: 2 });
		});
		it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })
		it('sohuld have the pickup option for items', () => {
			expect(sizzle('.contextMenuItem-PICKUP' + item.id).length).toBe(1);
		});
		it('should click pick up item', () => {
			expect(mouse.clickSelector('.contextMenuItem-PICKUP' + item.id)).toBe(true);
		});
		it('should get item', testGen(function* () {
			while (worker.getItems().length == 0) {
				yield sleep(gap)
			}
		}));
		it('should be the right item', () => {
			expect(worker.getItems()[0]).toBe(item);
		})
	})



	describe('walk away again', () => {
		it('context menu', testGen(function* () {
			mouse.canvasClick(new Block({ x: 8, y: 6 }).center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	});

	describe('put into oven', () => {
		it('click on oven', () => {
			mouse.canvasClick(ovenBlock.center.screen, { button: 2 });
		});
		it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })
		it('should have cook item option', () => {
			// debugger;
			expect(sizzle('.contextMenuItem-ITEMCOOK').length).toBe(1);
		});
		it('should click it', () => {
			expect(mouse.clickSelector('.contextMenuItem-ITEMCOOK')).toBe(true);
		});
		it('should put pizza in oven', testGen(function* () {
			while (worker.getItems().length > 0) {
				yield sleep(gap)
			}
		}))
	})



	describe('walk away again', () => {
		it('context menu', testGen(function* () {
			mouse.canvasClick(new Block({ x: 8, y: 6 }).center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	});
	describe('take out of oven', () => {
		it('click on oven', () => {
			mouse.canvasClick(ovenBlock.center.screen, { button: 2 });
		});
		it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })
		it('should have an extract option', () => {
			expect(sizzle('.contextMenuItem-EXTRACT' + item.id).length).toBe(1);
		})
		it('should click it', () => {
			expect(mouse.clickSelector('.contextMenuItem-EXTRACT' + item.id)).toBe(true);
		});
		it('should pick up item', testGen(function* () {
			while (worker.getItems().length == 0) {
				yield sleep(gap)
			}
		}))
		it('should put it down', testGen(function* () {
			while (worker.getItems().length > 0) {
				yield sleep(gap)
			}
		}))
	})




	describe('walk away again', () => {
		it('context menu', testGen(function* () {
			mouse.canvasClick(new Block({ x: 8, y: 6 }).center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	});

	describe('serving item', () => {
		it('should right click on item to make context menu appear', () => {
			mouse.canvasClick(item.position.screen, { button: 2 });
		});
		it('sohuld have the pickup option for items', () => {
			expect(sizzle('.contextMenuItem-PICKUP' + item.id).length).toBe(1);
		});
		it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })
		it('should click pick up item', () => {
			expect(mouse.clickSelector('.contextMenuItem-PICKUP' + item.id)).toBe(true);
		});
		it('should get item', testGen(function* () {
			while (worker.getItems().length == 0) {
				yield sleep(gap)
			}
		}));
		it('should be the right item', () => {
			expect(worker.getItems()[0]).toBe(item);
		})
	})



	describe('walk away again', () => {
		it('context menu', testGen(function* () {
			mouse.canvasClick(new Block({ x: 8, y: 6 }).center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	});
	describe('put back on table', () => {
		it('click on oven', () => {
			mouse.canvasClick(tableBlock.center.screen, { button: 2 });
		});
		it('should have an extract option', () => {
			expect(sizzle('.contextMenuItem-PUTITEM').length).toBe(1);
		})
		it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })
		it('should click it', () => {
			expect(mouse.clickSelector('.contextMenuItem-PUTITEM')).toBe(true);
		});
		it('should put it down', testGen(function* () {
			while (worker.getItems().length > 0) {
				yield sleep(gap)
			}
		}))
	})


	describe('walk away again', () => {
		it('context menu', testGen(function* () {
			mouse.canvasClick(tableBlock.center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	});
	describe('pick it up again', () => {
		it('should right click on item to make context menu appear', () => {
			mouse.canvasClick(item.position.screen, { button: 2 });
		});
		it('sohuld have the pickup option for items', () => {
			expect(sizzle('.contextMenuItem-PICKUP' + item.id).length).toBe(1);
		});
		it('should wait and show context menu', (done) => { setTimeout(done, contextGap) })
		it('should click pick up item', () => {
			expect(mouse.clickSelector('.contextMenuItem-PICKUP' + item.id)).toBe(true);
		});
		it('should get item', testGen(function* () {
			while (worker.getItems().length == 0) {
				yield sleep(gap)
			}
		}));
		it('should be the right item', () => {
			expect(worker.getItems()[0]).toBe(item);
		})
	})
	let customer:Character
	describe('serve the shit', () => {
		it('should have a customer by now', () => {
			let chars = game.state.character.getChars();
			expect(chars.length > 1).toBe(true);
			customer = chars[1];//the second spawn
			expect(customer.id).not.toBe(worker.id)
		})
		it('context menu', testGen(function* () {

			mouse.canvasClick(customer.position.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-SERVE' + customer.id)).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	})


	describe('walk away again', () => {
		it('context menu', testGen(function* () {
			mouse.canvasClick(new Block({ x: 8, y: 6 }).center.screen, { button: 2 });
			expect(sizzle('.contextMenu').length).toBe(1);
			yield sleep(contextGap)
			expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
			game.engine.fastForward(gap)//give him a frame to figure it out

		}))
		it('should walk there', testGen(function* () {
			while (worker.path.length > 0) {
				yield sleep(gap)
			}
		}))
	});

	it('should wait open at the end', (done) => {
		setTimeout(done, 1000);
	})
})