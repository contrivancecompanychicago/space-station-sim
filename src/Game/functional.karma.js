// @flow
import { extend, keys } from 'lodash';
import Game from 'Game';
import config from 'Game/config';
import ReactTestUtils from 'react-addons-test-utils';

import sizzle from 'sizzle'

import testGen from 'jasmine-es6-generator'


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

describe('functional end to end', () => {
	let container:HTMLDivElement
	let game:Game
	let canvas

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
		clickSelector('.button-grid-Tiles')
	})
	it('should draw some tiles', () => {
		canvas = container.getElementsByTagName('canvas')[0];
		expect(canvas).toBeDefined();
		mouseEvent(canvas, 'mousedown', {button:0, pageX:1, pageY:1});
		mouseEvent(canvas, 'mouseup', {button:0, pageX:config.grid.width * 10, pageY:config.grid.height * 10});
	});
	it('should draw some floor', testGen(function *() {
		clickSelector('.button-grid-Floor');
		mouseEvent(canvas, 'mousemove', {button:0, pageX:config.grid.width * 1.5, pageY:config.grid.height * 1.5});	
		mouseEvent(canvas, 'mousedown', {button:0, pageX:config.grid.width * 1.5, pageY:config.grid.height * 1.5});
		for(let i = 2; i<9; i++){
			mouseEvent(canvas, 'mousemove', {button:0, pageX:config.grid.width * i, pageY:config.grid.height * i});	
			yield sleep(100)
		}
		mouseEvent(canvas, 'mouseup', {button:0, pageX:config.grid.width * 9, pageY:config.grid.height * 9});

	}))



	it('should wait open', (done) => {
		setTimeout(() => {
			done();
		}, 1000)
	})

})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}