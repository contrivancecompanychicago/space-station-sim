import Imagine from 'imagine-engine';

require('./Game/style.css');

import managers from 'Game/Manager';
import Renderer from 'Game/Renderer';
import ActionDispatcher from 'Game/Action/Dispatcher';
import Time from 'Game/Manager/Time';
import state from 'Game/state';

import * as time from 'Game/time';
import * as engine from 'Game/engine';

import { keys } from 'lodash';

export default class Game{
  constructor(container){

    window.game = this; //bind to window for debug

    this.container = container; //register container

    this.engine = new Imagine(); //spawn engine
    engine.default = this.engine;

    this.state = state;//make initial reference to state global

    this.engine.register(new Renderer(this.state, this.container)); // renderer

    //spawn managers
    this.manager = this.engine.register({type:'manager', game:this}); // parent

    let timeManager = new Time(this.engine.time); //time manager
    time.default = timeManager;
    this.manager.addComponent(timeManager);

    keys(managers).forEach((key) => { // misc managers with state
      let manager = managers[key];
      this.state[key] = {};
      this.manager.addComponent(new manager(this.state[key], this.container));
    });

    // etc
    this.manager.addComponent(new ActionDispatcher(this.state, this.container));

  }

  destroy(){ //mainly for tests
    this.engine.notify('destroy');
  }

}
