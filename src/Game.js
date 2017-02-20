//@flow

// import Imagine from 'imagine-engine';

// FLOWHACK
require('Game/style.styl');

import Renderer from 'Game/Renderer';
import ActionDispatcher from 'Game/Action/Dispatcher';

import * as time from 'Game/time';
import engine from 'Game/engine';
import state from 'Game/state';

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

// import CharacterModel from 'Game/Model/Character'
// import GridModel from 'Game/Model/Grid';
// import ItemModel from 'Game/Model/Item'
// import LogModel from 'Game/Model/Log'
// import ObjectModel from 'Game/Model/Object'
// import OrderModel from 'Game/Model/Order'
// import PlayerModel from 'Game/Model/Player'
// import TaskModel from 'Game/Model/Task'
// import TimeModel from 'Game/Model/Time'
// import TutorialModel from 'Game/Model/Tutorial'
// import UIModel from 'Game/Model/UI'
// import ViewModel from 'Game/Model/View'


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

    engine.register(new Renderer(this.state, this.container)); // renderer
    engine.register(new CharacterController())
    engine.register(new TimeController())
    engine.register(new TutorialController())
    engine.register(new UIController())
    engine.register(new ViewController(container))
    
    //LOADGAME hacky
    load('quicksave')

  }

  // destroy(){ //mainly for tests
  //   this.engine.notify('destroy');
  // }

}
