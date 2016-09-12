import Imagine from 'imagine-engine';

require('./Game/style.css');

import managers from 'Game/Manager';
import Renderer from 'Game/Renderer';
import ActionDispatcher from 'Game/Action/Dispatcher';
import Time from 'Game/Time';
import state from 'Game/state';

import { keys } from 'lodash';

export default class Game{
  constructor(container){

    window.game = this;
    this.container = container;
    // console.log(window.game);

    this.engine = new Imagine();
    this.state = state;//make initial reference

    this.engine.register(new Renderer(this.state, this.container));


    //spawn managers
    this.manager = this.engine.register({type:'manager', game:this});
    this.manager.addComponent(new Time(this.engine.time));

    keys(managers).forEach((key) => {
      let manager = managers[key];
      this.state[key] = {};
      this.manager.addComponent(new manager(this.state[key], this.container));
    });
    this.manager.addComponent(new ActionDispatcher(this.state, this.container));



  }

  destroy(){
    this.engine.notify('destroy');
  }
}
