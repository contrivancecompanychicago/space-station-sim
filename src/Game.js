import Imagine from 'imagine-engine';

require('./Game/style.css');

import managers from 'Game/Manager';
import Renderer from 'Game/Renderer';
import ActionDispatcher from 'Game/Action/Dispatcher';
import Time from 'Game/Time';

import { keys } from 'lodash';

export default class Game{
  constructor(container){
    this.container = container;

    this.engine = new Imagine();
    this.state = {};//make initial reference



    //spawn managers
    this.manager = this.engine.register({type:'manager', game:this});
    keys(managers).forEach((key) => {
      let manager = managers[key];
      this.state[key] = {};
      this.manager.addComponent(new manager(this.state[key], this.container));
    });
    this.manager.addComponent(new Time(this.engine.time));
    this.manager.addComponent(new ActionDispatcher(this.state, this.container));

    this.engine.register(new Renderer(this.state, this.container));


  }

  destroy(){
    this.engine.notify('destroy');
  }
}
