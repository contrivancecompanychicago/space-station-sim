import { createStore } from 'redux';
import UI from 'Game/UI';
import reducer from 'Game/UI/reducer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export default class UIManager{
  constructor(state, container){
    this.type = 'uiManager';
    if(!container) throw new Error('I need a container to render in');
    this.container = container;
  }
  start(){
    this.store = createStore(reducer);
    this.store.subscribe(this.render.bind(this));
    this.render();
  }
  render(){
    ReactDOM.render(<Provider store={this.store}><UI /></Provider>, this.container);
  }
}
