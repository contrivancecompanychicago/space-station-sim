
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
		document.body.appendChild(container)
		game = new Game(container);
	});
	it('should wait to start', (done) => {
		setTimeout(() => {
			done();
		}, 1000)
	})

	it('should click next on the tutorial a few times', () => {
		let tutnext = sizzle('.tutorial');
		expect(tutnext).toBe("elemnt")
		console.log(container.childNodes)
	})

	it('should wait open', (done) => {
		setTimeout(() => {
			done();
		}, 10000)
	})

})