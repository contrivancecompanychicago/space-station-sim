// @flow
import { extend, keys, assign } from 'lodash';
import Game from 'Game';
import config from 'Game/config';
import ReactTestUtils from 'react-addons-test-utils';

import sizzle from 'sizzle'

import testGen from 'jasmine-es6-generator'

const tg:(Generator<*,*,*>)=>null = testGen

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

let gap = 10

describe('functional end to end', () => {

	beforeAll(function() {
		if(container)
			document.body.removeChild(container)

		jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
		//jasmine.getEnv().defaultTimeoutInterval = 60*1000;

		container = document.createElement('div');
		container.style = 'position:absolute; left: 0px; top: 0px; display:block; width: 100%; height: 100%';
		document.body.appendChild(container)
		game = new Game(container);
	});
	afterAll(function(){
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
		}, gap)
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
		yield sleep(gap);
		expect(clickSelector('.button-object-STONEOVEN')).toBe(true)
		yield sleep(gap);
		canvasMouseMove(new Block({x:3, y: 3}).center);
		yield sleep(gap);
		canvasClickBlock(new Block({x:3, y: 3}))
	}))

	it('should click next on the tutorial a few times', (done) => {
		let i = setInterval(() => {
			let tutnext = sizzle('.tutorial button');
			if(tutnext.length > 0){
				ReactTestUtils.Simulate.click(tutnext[0]);
			}else{
				clearInterval(i);
				done();
			}
		}, gap)
	})
	it('should make fridge', testGen(function *() {
		yield sleep(gap);
		expect(clickSelector('.button-object-FRIDGE')).toBe(true)
		yield sleep(gap);
		canvasMouseMove(new Block({x:6, y: 3}).center);
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		canvasClickBlock(new Block({x:6, y: 3}))
	}))
	it('should make another fridge', testGen(function *() {
		canvasMouseMove(new Block({x:8, y: 3}).center);
		yield sleep(gap);
		canvasClickBlock(new Block({x:8, y: 3}))
	}))
	
	it('should make a prep table', testGen(function *() {
		yield sleep(gap);
		expect(clickSelector('.button-object-TABLE3')).toBe(true)
		canvasClickBlock(new Block({x:9, y: 3}))
		
	}))
	it('should click next on the tutorial a few times', (done) => {
		let i = setInterval(() => {
			let tutnext = sizzle('.tutorial button');
			if(tutnext.length > 0){
				ReactTestUtils.Simulate.click(tutnext[0]);
			}else{
				clearInterval(i);
				done();
			}
		}, gap)
	})
	it('should make a line of prep table', testGen(function *() {
		canvasMouseMove(new Block({x:9, y: 5}).center);
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield *canvasDragRect({x:9, y:5}, {x:6, y:5})

	}))
	it('should make another oven', testGen(function *() {
		expect(clickSelector('.button-object-STONEOVEN')).toBe(true)
		canvasMouseMove(new Block({x:4, y: 7}).center);
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		canvasClickBlock(new Block({x:4, y: 7}))
	}))
	it('should make some serve tables', testGen(function *() {
		expect(clickSelector('.button-object-TABLE4')).toBe(true)
		canvasMouseMove(new Block({x:6, y: 7}).center);
		
		yield *canvasDragRect({x:6, y:7}, {x:9, y:7})
	}))
	
	it('should make some chairs', testGen(function *() {
		expect(clickSelector('.button-object-CHAIR2')).toBe(true)
		
		canvasMouseMove(new Block({x:5, y: 9}).center);
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield *canvasDragRect({x:5, y:9}, {x:8, y:9})
		//COPYPASTA
		canvasMouseMove(new Block({x:5, y: 12}).center);
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield *canvasDragRect({x:5, y:12}, {x:8, y:12})

	}));

	it('should make tables', testGen(function *() {
		expect(clickSelector('.button-object-TABLE5')).toBe(true)
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield *canvasDragRect({x:5, y:10}, {x:8, y:11})

	}));
	it('should make drink things', testGen(function *() {
		expect(clickSelector('.button-object-DRAWERS')).toBe(true)
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('button.rotate')).toBe(true)
		yield *canvasDragRect({x:3, y:8}, {x:3, y:10})

	}));


	it('should make some spawn point', testGen(function *() {
		expect(clickSelector('.button-object-TEST')).toBe(true)
		canvasMouseMove(new Block({x:0, y: 3}).center);
		
		yield *canvasDragRect({x:0, y:14}, {x:5, y:16})
	}))
	
	it('should wait for a character to spawn', testGen(function *() {
		
		expect(clickSelector('.button-mode-select')).toBe(true)

		game.state.character.spawnCustomer();

		while(game.state.character.getChars().length == 0){
			yield sleep(gap);
		}
		let char = game.state.character.getChars()[0];
		
		canvasMouseMove(char.position.screen);
		//select
		canvasClick(char.position.screen)
		//follow
		expect(clickSelector('.follow')).toBe(true)
		yield sleep(gap);
	}));
	
	
	it('should speed up time', testGen(function *() {
		expect(clickSelector('.button-speed-fast')).toBe(true)
		expect(game.state.ui.state.speed).toBe('FAST')
	}));
	

	let order;

	it('should wait for order', testGen(function *() {
		while(game.state.order.getOrders().length == 0){
			yield sleep(gap);
		}
		order = game.state.order.getOrders()[0];
	}));

	it('should open hiring panel',  testGen(function *() {
	
		gap = 100
		yield sleep(gap);
		expect(clickSelector('.selected .close')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('.button-mode-panels')).toBe(true)
		yield sleep(gap);
		expect(clickSelector('.button-panel-hiring')).toBe(true)
	}));

	let char;

	it('should hire staff',  testGen(function *() {
		yield sleep(gap);
		expect(clickSelector('.hireable button')).toBe(true)
		yield sleep(gap);
		char = game.state.ui.state.selected[0];
		expect(char).toBeDefined();
	}));

	it('should give him a new path', testGen(function *() {
		expect(clickSelector('.button-mode-select')).toBe(true)
		//right click somewhere
		canvasClick(new Block({x:12, y:12}).center.screen, {button:2});
		yield sleep(gap);
		let lastblock = char.path[char.path.length-1]
		expect(lastblock.x).toBe(12);
		expect(lastblock.y).toBe(12);
	}));

	// it('should select an object',  testGen(function *() {
		
	// 	let tablepos = new Block({x:5, y:10});
	// 	let obj = game.state.object.getObjectAtBlock(tablepos);
	// 	expect(obj).toBeDefined();
	// 	let point = tablepos.center.screen
	// 	// debugger;
	// 	canvasClick(point);
	// 	// canvasClickBlock(tablepos)
	// 	expect(game.state.ui.state.selected).toBe('whatevs')
	// }));


	it('should assign make tasks',  testGen(function *() {
		clickCheckbox('label.task-MAKE input')
	}));

	it('should make the order',  testGen(function *() {
		while(order.status !== 'MADE'){
			yield sleep(gap);
		}
		expect(order.status).toBe('MADE');
	}));

	it('should hire cook staff',  testGen(function *() {
		yield sleep(gap);
		expect(clickSelector('.hireable button')).toBe(true)
		yield sleep(gap);
	}));
	
	it('should cook the order',  testGen(function *() {
		clickCheckbox('label.task-COOK input')
		while(order.status !== 'COOKED'){
			yield sleep(gap);
		}
		expect(order.status).toBe('COOKED');
	}));


	it('should hire serve staff',  testGen(function *() {
		yield sleep(gap);
		expect(clickSelector('.hireable button')).toBe(true)
		yield sleep(gap);
		clickCheckbox('label.task-SERVEFOOD input')
	}));

	it('should serve the order',  testGen(function *() {
		while(order.status !== 'FULFILLED'){
			yield sleep(gap);
		}
		expect(order.status).toBe('FULFILLED');
	}));

	it('should have a drink order somewhere', () => {
		order = game.state.order.state[0];
		expect(order.type).toBe('COFFEE');
	})

	it('should hire drink staff', testGen(function *() {

		yield sleep(gap);
		expect(clickSelector('.hireable button')).toBe(true)
		yield sleep(gap);
		char = game.state.ui.state.selected[0];
	}));

	it('should manually assign drink task', testGen(function *() {
		canvasClick(new Block({x:3, y:8}).center.screen, {button:2});
		yield sleep(gap);
		let lastblock = char.path[char.path.length-1]
		expect(lastblock.y).toBe(8);
	}));
	it('should serve the drink',  testGen(function *() {
		while(order.status !== 'FULFILLED'){
			yield sleep(gap);
		}
		expect(order.status).toBe('FULFILLED');
		
	}));
	it('should autoserve drinks', () => {
		clickCheckbox('label.task-SERVEDRINK input')
	})

	it('clean up panels', () => {
		clickSelector('.hiring.panel .close')
		expect(clickSelector('.selected .close')).toBe(true)
		clickSelector('.tutorial button')

	})


	describe('save and load', () => {
		beforeAll(()=>{
			clickSelector('.button-speed-normal')
			clickSelector('.button-mode-panels')
			clickSelector('.button-panel-save')

		})
		afterAll(() => {
			// game.state.clear();
		})
		it('should save', (done) => {
			let saveinput = sizzle('.save.panel input')[0];
			saveinput.value = 'functional';
			ReactTestUtils.Simulate.change(saveinput);//unnecessary?
			expect(clickSelector('.save.panel button#save')).toBe(true)
			expect(localStorage['save_functional']).toBeDefined();
			setTimeout(done, 1000);
		})
		it('should load stock', (done) => {
			clickSelector('button#load-large');
			setTimeout(done, 1000);
		})
		it('should load functionalagain', (done) => {
			clickSelector('button#load-functional');
			setTimeout(done, 2000);
		})
		it('shuld have the same character with a responsibility', (done) => {
			let c1 = (game.state.character.getChar(char.id))
			let c2 = (char);
			expect(c1.id).toBe(c2.id)
			
			setTimeout(done, 2000);
		})

	})



	it('should wait open', (done) => {
		setTimeout(() => {
			done();
		}, 1000)
	})

})

function clickCheckbox(selector:string){
	let el = sizzle(selector)[0]
	ReactTestUtils.Simulate.change(el, {"target": el})
}

function canvasMouseMove(pos:{x:number, y:number}){
	mouseEvent(canvas, 'mousemove', {button:0, pageX:pos.x, pageY:pos.y});	
}

function canvasClickBlock(block:Block){
	// mouseEvent(canvas, 'mousemove', {button:0, pageX:block.center.x, pageY:block.center.y});	
	mouseEvent(canvas, 'mousedown', {button:0, pageX:block.center.x, pageY:block.center.y});	
	mouseEvent(canvas, 'mouseup', {button:0, pageX:block.center.x, pageY:block.center.y});
}
function canvasClick(pos:{x:number, y:number}, param){
	// debugger;
	// mouseEvent(canvas, 'mousemove', {button:0, pageX:block.center.x, pageY:block.center.y});	
	
	let params = assign({button:0, pageX:pos.x, pageY:pos.y}, param)
	
	mouseEvent(canvas, 'mousedown', params);	
	mouseEvent(canvas, 'mouseup', params);
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
	for(let i = 0; i<1; i+=0.2){ //percentages
		let pos = {
			x: fromBlock.center.x + (diff.x*i),
			y: fromBlock.center.y + (diff.y*i)
		}
		mouseEvent(canvas, 'mousemove', {button:0, pageX:pos.x, pageY:pos.y});	
		yield sleep(gap)
	}
	mouseEvent(canvas, 'mouseup', {button:0, pageX:toBlock.center.x, pageY:toBlock.center.y});
}