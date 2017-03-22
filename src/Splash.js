// @flow

/**
 * shows some shit before launching the game. also triggers loadgame
 */

import Game from 'Game';

export default class Splash{
	container: HTMLElement
	constructor(container:HTMLElement){
		this.container = container
	}
	startGame(){
		this.container.innerHTML = ''
		
	}
}