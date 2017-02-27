// @flow
import { extend, keys } from 'lodash';
import Game from 'Game';
import config from 'Game/config';
import ReactTestUtils from 'react-addons-test-utils';

import sizzle from 'sizzle'

import testGen from 'jasmine-es6-generator'

import Block from 'Game/Block'
import type Grid from 'Game/Type/Grid'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let mouseEvent = function(target, eventName, params){
  var event = document.createEvent('Event');
  extend(event, params);
  event.initEvent(eventName, true, true);
  target.dispatchEvent(event); //was document
};

let clickSelector = function(selector:string):boolean{
	let elements = sizzle(selector);
	if(elements.length>0){
		ReactTestUtils.Simulate.click(elements[0])
		return true;
	}
	return false;
}

let container:HTMLDivElement
let game:Game
let canvas

describe('functional end to end', () => {

	beforeAll(function() {

		jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
		//jasmine.getEnv().defaultTimeoutInterval = 60*1000;

		container = document.createElement('div');
		container.style = 'position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%';
		document.body.appendChild(container)
		game = new Game(container);
	});
	afterAll(function(){
		document.body.removeChild(container)
	})
	it('should wait to start', (done) => {
		setTimeout(() => {
			canvas = container.getElementsByTagName('canvas')[0];
			done();
		}, 1000)
	})

	it('should close the savepanel', () => {
		clickSelector('.save.panel .close')
	})

	it('should click next on the tutorial a few times', (done) => {
		let i = setInterval(() => {
			let tutnext = sizzle('.tutorial button');
			if(tutnext.length > 0){
				ReactTestUtils.Simulate.click(tutnext[0]);
			}else{
				clearInterval(i);
				done();
			}
		}, 100)
	})
	it('should open grid panel', () => {
		clickSelector('.button-mode-grid')
		expect(clickSelector('.button-grid-TILES1')).toBe(true)
	})
	it('should insta-draw some tiles', () => {
		expect(canvas).toBeDefined();
		mouseEvent(canvas, 'mousedown', {button:0, pageX:1, pageY:1});
		mouseEvent(canvas, 'mouseup', {button:0, pageX:config.grid.width * 10, pageY:config.grid.height * 10});
		
	});
	it('should draw some floor', testGen(function *() {
		expect(clickSelector('.button-grid-FLOOR')).toBe(true)
		yield *canvasDragRect({x:0, y:0}, {x:16, y:16});
		let node:Grid = game.state.grid.getNode(0,0);
		expect(node).toBeDefined();
		expect(node.type).toBe('FLOOR')
		node = game.state.grid.getNode(16,16);
		expect(node).toBeDefined();
		expect(node.type).toBe('FLOOR')

	}))
	it('should draw some walls', testGen(function *() {
		expect(clickSelector('.button-grid-GREYWALL')).toBe(true)
		yield *canvasDragRect({x:2, y:2}, {x:2, y:10});
		yield *canvasDragRect({x:2, y:2}, {x:10, y:2});
		yield *canvasDragRect({x:10, y:2}, {x:10, y:10});
	}))

	it('should make some stone oven', testGen(function *() {
		expect(clickSelector('.button-mode-object')).toBe(true)
		yield sleep(100);
		expect(clickSelector('.button-object-STONEOVEN')).toBe(true)
		yield sleep(100);
		canvasMouseMove(new Block({x:3, y: 3}).center);
		yield sleep(100);
		canvasClickBlock(new Block({x:3, y: 3}))
	}))

	it('should make fridge', testGen(function *() {
		yield sleep(100);
		expect(clickSelector('.button-object-FRIDGE')).toBe(true)
		yield sleep(100);
		canvasMouseMove(new Block({x:6, y: 3}).center);
		yield sleep(100);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(100);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(100);
		canvasClickBlock(new Block({x:6, y: 3}))
	}))
	it('should make another fridge', testGen(function *() {
		canvasMouseMove(new Block({x:8, y: 3}).center);
		yield sleep(100);
		canvasClickBlock(new Block({x:8, y: 3}))
	}))




	it('should wait open', (done) => {
		setTimeout(() => {
			done();
		}, 3000)
	})

})

function canvasMouseMove(pos:{x:number, y:number}){
	mouseEvent(canvas, 'mousemove', {button:0, pageX:pos.x, pageY:pos.y});	
}

function canvasClickBlock(block:Block){
	// debugger;
	// mouseEvent(canvas, 'mousemove', {button:0, pageX:block.center.x, pageY:block.center.y});	
	mouseEvent(canvas, 'mousedown', {button:0, pageX:block.center.x, pageY:block.center.y});	
	mouseEvent(canvas, 'mouseup', {button:0, pageX:block.center.x, pageY:block.center.y});
}

//TODO REFACTOR
function* canvasDragRect(from:{x:number, y:number}, to:{x:number, y:number}):Generator<*,*,*>{
	let fromBlock = new Block(from)
	let toBlock = new Block(to)
	mouseEvent(canvas, 'mousemove', {button:0, pageX:fromBlock.center.x, pageY:fromBlock.center.y});	
	mouseEvent(canvas, 'mousedown', {button:0, pageX:fromBlock.center.x, pageY:fromBlock.center.y});	
	let diff = {
		x: toBlock.center.x-fromBlock.center.x, 
		y: toBlock.center.y-fromBlock.center.y
	}
	// console.log(diff)
	for(let i = 0; i<1; i+=0.1){ //percentages

		let pos = {
			x: fromBlock.center.x + (diff.x*i),
			y: fromBlock.center.y + (diff.y*i)
		}
		
		mouseEvent(canvas, 'mousemove', {button:0, pageX:pos.x, pageY:pos.y});	
		yield sleep(50)
	}
	mouseEvent(canvas, 'mouseup', {button:0, pageX:toBlock.center.x, pageY:toBlock.center.y});
}