//@flow

// import Imagine from 'imagine-engine';

// FLOWHACK
require('Game/style.styl');

import Renderer from 'Game/Renderer';
import ActionDispatcher from 'Game/Action/Dispatcher';

import engine, {Engine} from 'Game/engine'
import state from 'Game/state';

import { keys } from 'lodash';

import type {State} from 'Game/state'

import Obj from 'Game/Type/Object'; //for loading hack
import Grid from 'Game/Type/Grid'; //for loading hack

import load from 'Game/State/load';

import CharacterController from 'Game/Controller/Character'
import TimeController from 'Game/Controller/Time'
import TutorialController from 'Game/Controller/Tutorial'
import ViewController from 'Game/Controller/View'
import UIController from 'Game/Controller/UI'

import Point from 'Game/Point'

import genMap from 'Game/Map'

export default class Game{
	container:HTMLElement
	engine: Engine;
	state: State;
	constructor(container:HTMLElement){

		window.game = this; //bind to window for debug

		this.container = container; //register container

		this.engine = engine; //spawn engine

		this.state = state;//make initial reference to state global
		state.init();

		Point.registerState(state);
		//THIS IS THE ORDER OF EXECUTION
		engine.register(new TimeController()) //TIME FIRST
		engine.register(new CharacterController())
		engine.register(new TutorialController())
		engine.register(new Renderer(this.state, this.container)); // HAS TO BE ABOVE VIEW AND UI
		engine.register(new ViewController(container))
		engine.register(new UIController(container))

		engine.start();

		genMap(state);
		
		//LOADGAME hacky
		// load('quicksave')
		if(localStorage.getItem('hot')==='true'){
			state.load('autosave')
		}

	}

	destroy(){
		this.engine.stop();
	}


}
