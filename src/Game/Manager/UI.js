import { createStore } from 'redux';
import UI from 'Game/UI';
import reducer from 'Game/UI/reducer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { keys, assign } from 'lodash';
import Speed from 'Game/Type/Speed';

export default class UIManager{
  constructor(state, container){
    this.type = 'uiManager';
    this.state = state;
    if(!container) throw new Error('I need a container to render in');

    const UIDiv = document.createElement('div');
    container.appendChild(UIDiv);

    this.container = UIDiv;
  }
  start(){
    this.store = createStore(reducer, this.state);
    this.setState();
    this.store.subscribe(this.render.bind(this));
    this.render();
  }
  render(){
    this.setState();
    // this.object.engine.time. Speed[this.state.speed].speed;
    ReactDOM.render(<Provider store={this.store}><UI /></Provider>, this.container);
  }
  setState(){
    keys(this.state).forEach((key) => {
      delete this.state[key];
    });
    assign(this.state, this.store.getState());

  }
}
