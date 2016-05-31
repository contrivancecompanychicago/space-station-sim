import Imagine from 'imagine-engine';

export default class Game{
  constructor(container){
    this.container = container;
    this.container.appendChild(document.createElement('canvas'));
    this.engine = new Imagine();
    this.manager = this.engine.register({type:'manager', game:this});
  }
  
}
