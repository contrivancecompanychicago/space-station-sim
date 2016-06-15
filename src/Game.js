import Imagine from 'imagine-engine';

import UIManager from 'Game/Manager/UI';

export default class Game{
  constructor(container){
    this.container = container;
    this.container.appendChild(document.createElement('canvas'));
    this.engine = new Imagine();
    this.manager = this.engine.register({type:'manager', game:this});
    const UIDiv = document.createElement('div');
    this.container.appendChild(UIDiv);
    this.manager.addComponent(new UIManager(null, UIDiv));
  }
}
