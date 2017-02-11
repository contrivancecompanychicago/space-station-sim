// @flow

import { createStore } from 'redux';
import UI from 'Game/UI';
import reducer from 'Game/UI/reducer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { keys, assign } from 'lodash';
import Speed from 'Game/Data/Speed';

import engine from 'Game/engine'

// import type { UIState } from 'Game/UI/State'

import Component from 'Imagine/Component'

import type {UIState} from 'Game/state'

/*
UI Manager

UI is a react redux application

maintains a state that is used by a tonne of other things
 - renderings potential changeState
 - making changeState


*/

import Manager from 'Game/Manager'


export default class UIManager extends Manager{
  state:UIState;
  container: HTMLElement;
  store: {subscribe:Function, getState:Function, dispatch:Function};
  constructor(state:UIState, container:HTMLElement){
    super()
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
    // ReactDOM.render(<Provider store={this.store}><UI /></Provider>, this.container);
    this.forceUpdate();
  }
  forceUpdate(){
    // console.log('forcing update')
    ReactDOM.render(<Provider store={this.store}><UI /></Provider>, this.container);
  }
  setState(){
    keys(this.state).forEach((key) => {
      delete this.state[key];
    });
    assign(this.state, this.store.getState());

  }
  setSelected(selected:any){
    this.store.dispatch({type:'SET_SELECTED', selected:selected})
  }

  update(){
    //KEYS
    let keys = {
      'P': 80,
      'O': 79,
      'I': 73,
      'L': 76,
      'R': 82,
      'ESC': 27
    }
    if(engine.input.getKeyDown(keys.P)){
      this.store.dispatch({type:'TOGGLE_HIRING_PANEL'})
    }
    if(engine.input.getKeyDown(keys.O)){
      this.store.dispatch({type:'TOGGLE_ORDERS_PANEL'})
    }
    if(engine.input.getKeyDown(keys.I)){
      this.store.dispatch({type:'TOGGLE_STAFF_PANEL'})
    }
    if(engine.input.getKeyDown(keys.L)){
      this.store.dispatch({type:'TOGGLE_LOG_PANEL'})
    }

    if(engine.input.getKeyDown(keys.R)){ //rotate
        this.store.dispatch({type:'ROTATE'})
    }
    if(engine.input.getKeyDown(keys.ESC)){ //escape
        this.store.dispatch({type:'CHANGE_MODE', id: 'SELECT'})
    }
  }


}
