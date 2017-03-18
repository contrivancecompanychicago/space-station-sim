// @flow

import Game from 'Game';

import mouse from './mouseTestUtil'

import testGen from 'jasmine-es6-generator'
import Block from 'Game/Block'

let gap = 20;
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let container: HTMLDivElement;
let canvas;
let game: Game

describe('giving Orders', () => {
	// beforeAll(function () {
	// 	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10*1000;
	// 	container = document.createElement('div');
	// 	container.style = 'position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%';
	// 	document.body.appendChild(container)
	// 	game = new Game(container);
	// })
	// it('should wait to start', (done) => {
	// 	setTimeout(() => {
	// 		canvas = container.getElementsByTagName('canvas')[0];
	// 		mouse.setCanvas(canvas);
	// 		done();
	// 	}, 100)
	// })
	// it('should set up', testGen(function* () {

	// 	mouse.clickSelector('.save.panel .close')
	// 	//grid
	// 	expect(mouse.clickSelector('.button-mode-grid')).toBe(true)
	// 	expect(mouse.clickSelector('.button-grid-FLOOR')).toBe(true)
	// 	yield* mouse.canvasDragRect({ x: 0, y: 0 }, { x: 16, y: 16 });
	// 	//objects
	// 	expect(mouse.clickSelector('.button-mode-object')).toBe(true)
	// 	expect(mouse.clickSelector('.button-object-DRAWERS')).toBe(true)
	// 	mouse.canvasClickBlock(new Block({ x: 6, y: 3 }))
	// 	expect(mouse.clickSelector('.button-object-CHAIR2')).toBe(true)
	// 	mouse.canvasClickBlock(new Block({ x: 6, y: 9 }))
	// 	expect(mouse.clickSelector('.button-object-TEST')).toBe(true)
	// 	mouse.canvasClickBlock(new Block({ x: 12, y: 3 }));

	// }))
})