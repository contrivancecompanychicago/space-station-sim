
import Game from 'Game';
import ReactTestUtils from 'react-addons-test-utils';

import sizzle from 'sizzle'

describe('functional end to end', () => {
	let container
	let game

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
		ReactTestUtils.Simulate.click(sizzle('.button-mode-grid')[0])
		ReactTestUtils.Simulate.click(sizzle('.button-grid-Tiles')[0])
	})
	it('should draw some tiles', () => {

	})

	it('should wait open', (done) => {
		setTimeout(() => {
			done();
		}, 1000)
	})

})