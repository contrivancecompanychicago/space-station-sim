// @flow

/**
 * shows some shit before launching the game. also triggers loadgame
 */

import Game from 'Game';

export default class Splash{
	container: HTMLElement
	constructor(container:HTMLElement){
		this.container = container
		//freeplay mode
		//mission mode
	}
	startGame(){
		this.container.innerHTML = ''
		
	}
}