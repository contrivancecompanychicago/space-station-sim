import { createStore } from 'redux';
import UI from 'Game/UI';
import reducer from 'Game/UI/reducer';
import React from 'react';
import ReactDOM from 'react-dom';

export default class UIManager{
  constructor(state, container){
    if(!container) throw new Error('I need a container to render in');
    this.container = container;
  }
  start(){
    this.store = createStore(reducer);
    this.store.subscribe(this.render);
    this.render();
  }
  render(){
    ReactDOM.render(<UI />, this.container);
  }
}
