import Imagine from 'imagine-engine';

require('./Game/style.css');

import managers from 'Game/Manager';
import Renderer from 'Game/Renderer';

import { keys } from 'lodash';

export default class Game{
  constructor(container){
    this.container = container;

    this.engine = new Imagine();
    this.state = {};

    //spawn managers
    this.manager = this.engine.register({type:'manager', game:this});
    keys(managers).forEach((key) => {
      let manager = managers[key];
      this.state[key] = {};
      this.manager.addComponent(new manager(this.state[key], this.container));
    });

    this.engine.register(new Renderer(this.state, this.container));

  }
}
