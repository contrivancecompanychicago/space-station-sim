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

import load from 'Game/State/load';

import CharacterController from 'Game/Controller/Character'
import TimeController from 'Game/Controller/Time'
import TutorialController from 'Game/Controller/Tutorial'
import UIController from 'Game/Controller/UI'
import ViewController from 'Game/Controller/View'

import CharacterModel from 'Game/Model/Character'
import GridModel from 'Game/Model/Grid';
import ItemModel from 'Game/Model/Item'
import LogModel from 'Game/Model/Log'
import ObjectModel from 'Game/Model/Object'
import OrderModel from 'Game/Model/Order'
import PlayerModel from 'Game/Model/Player'
import TaskModel from 'Game/Model/Task'
import TimeModel from 'Game/Model/Time'
import TutorialModel from 'Game/Model/Tutorial'
import UIModel from 'Game/Model/UI'
import ViewModel from 'Game/Model/View'


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

    state.init();

    // state.character = new CharacterModel()
    // state.grid = new GridModel()
    // state.item = new ItemModel()
    // state.log = new LogModel()
    // state.object = new ObjectModel()
    // state.order = new OrderModel()
    // state.player = new PlayerModel()
    // state.task = new TaskModel()
    // state.time = new TimeModel()
    // state.tutorial = new TutorialModel()
    // state.ui = new UIModel()
    // state.view = new ViewModel()

    this.engine.register(new Renderer(this.state, this.container)); // renderer

    //spawn managers
    let managers = [];
    this.manager = this.engine.register({type:'manager', game:this}); // parent

    managers.push(new CharacterController())
    managers.push(new TimeController())
    managers.push(new TutorialController())
    managers.push(new UIController())
    managers.push(new ViewController(container))

    // let timeManager = new Time(this.state.Time, this.engine.time); //time manager
    // time.default = timeManager;
    // managers.push(timeManager);

    // keys(Managers).forEach((key) => { // misc managers with state
    //   let manager = Managers[key];
    //   managers.push(new manager(this.state[key], this.container));
    // });

    let dispatcher = new ActionDispatcher(this.state, this.container);
    managers.push(dispatcher);

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
