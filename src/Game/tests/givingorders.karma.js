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

let container: HTMLDivElement;
let canvas;
let game: Game

fdescribe('givingorders.karma.js', () => {
	beforeAll(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10*1000;
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
			mouse.setCanvas(canvas);
			done();
		// }, 100)
	})
	
	it('draw blocks', () => {
		expect(mouse.clickSelector('.button-mode-grid')).toBe(true)
		expect(mouse.clickSelector('.button-grid-FLOOR')).toBe(true)
		let fromBlock = new Block({x:0, y:0})
		let toBlock = new Block({x:16, y:16})
		spyOn(dispatcher, 'userAction').and.callThrough();
		mouse.canvasMouseDown(fromBlock.center.screen)
		mouse.canvasMouseUp(toBlock.center.screen)
		expect(dispatcher.userAction).toHaveBeenCalled();
	});
	let drawersBlock = new Block({ x: 6, y: 3 })
	let chairBlock = new Block({ x: 6, y: 9 })
	let spawnBlock = new Block({ x: 12, y: 3 })
	describe('setup', () => {
		it('right mode', testGen(function* () {

			mouse.clickSelector('.save.panel .close')
			//grid
			// yield* mouse.canvasDragRect({ x: 0, y: 0 }, { x: 16, y: 16 });
			//objects
			expect(mouse.clickSelector('.button-mode-object')).toBe(true)
			
		}))
		it('click COFFEEMACHINE', () => {
			expect(mouse.clickSelector('.button-object-COFFEEMACHINE')).toBe(true)
			mouse.canvasClickBlock(drawersBlock)
			
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
		mouse.canvasClick(new Block({ x: 12, y: 12 }).center.screen, { button: 2 });
		expect(sizzle('.contextMenu').length).toBe(1);
		// debugger;
	})

	it('should click walk', () => {
		expect(mouse.clickSelector('.contextMenuItem-MOVEHERE')).toBe(true)
	})

	it('should have path set', () => { //removed when context menu added
		game.engine.fastForward(gap)//give him a frame to figure it out
		let lastblock = worker.path[worker.path.length - 1]
		expect(lastblock.x).toBe(12);
		expect(lastblock.y).toBe(12);
	})

	it('close hiring panel', () => {
		mouse.clickSelector('.hiring.panel .close')
	})

	it('sohuld walk there', testGen(function* () {
		while(worker.path.length>0){
			yield sleep(gap)
		}
	}))

	it('should right click and open context menu', () => {
		expect(mouse.clickSelector('.button-mode-select')).toBe(true)
		//right click somewhere
		mouse.canvasClick(new Block(drawersBlock).center.screen, { button: 2 });
		expect(game.state.ui.state.contextMenu.show).toBe(true);
	})

	// it('should wait open at the end', (done) => {
	// 	setTimeout(done, 1000);
	// })
})