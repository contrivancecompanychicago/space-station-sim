//@flow

// import Imagine from 'imagine-engine';

// FLOWHACK
require('./Game/style.styl');

import Managers from 'Game/Manager/index';
import Renderer from 'Game/Renderer';
import ActionDispatcher from 'Game/Action/Dispatcher';
import Time from 'Game/Manager/Time';

import state from 'Game/state';
import * as time from 'Game/time';
import engine from 'Game/engine';

import { keys } from 'lodash';

import type {State} from 'Game/state'

import Obj from 'Game/Type/Object'; //for loading hack
import Grid from 'Game/Type/Grid'; //for loading hack

import load from 'Game/State/load'

export default class Game{
  container:HTMLElement
  engine:any;
  state: State;
  manager:Object;
  constructor(container:HTMLElement){

    window.game = this; //bind to window for debug

    this.container = container; //register container

    this.engine = engine; //spawn engine

    this.state = state;//make initial reference to state global

    this.engine.register(new Renderer(this.state, this.container)); // renderer

    //spawn managers
    let managers = [];
    this.manager = this.engine.register({type:'manager', game:this}); // parent

    let timeManager = new Time(this.state.Time, this.engine.time); //time manager
    time.default = timeManager;
    // this.manager.addComponent(timeManager);
    managers.push(timeManager);

    keys(Managers).forEach((key) => { // misc managers with state
      let manager = Managers[key];
      // if(!this.state[key])
      //   this.state[key] = {};
      // this.manager.addComponent(new manager(this.state[key], this.container));
      managers.push(new manager(this.state[key], this.container));
    });

    // etc
    let dispatcher = new ActionDispatcher(this.state, this.container);
    // this.manager.addComponent(dispatcher);
    managers.push(dispatcher);

    //register
    //debugger;
    managers.forEach(man => {
      this.manager.addComponent(man);
    })
    //initialise
    managers.forEach(man => {
      
      // FLOWHACK
      if(man.init) man.init();
    })

    //LOADGAME hacky
    load('quicksave')

  }

  destroy(){ //mainly for tests
    this.engine.notify('destroy');
  }

}
