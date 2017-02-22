// @flow

/*
UI Manager

UI is a react redux application

maintains a state that is used by a tonne of other things
 - renderings potential changeState
 - making changeState


*/

import { createStore } from 'redux';
import UI from 'Game/UI';
import reducer from 'Game/UI/reducer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { keys, assign } from 'lodash';

import save from 'Game/State/save'

import engine from 'Game/engine'

import Component from 'Imagine/Component'

import type Obj from 'Game/Type/Object'
import type Character from 'Game/Type/Character'
import {SpeedType} from 'Game/Data/Speed'

import type {GridType} from 'Game/Data/Grid'
import type {ObjectType} from 'Game/Data/Object'

export type UIState = {
  mode:any,
  rotation: number,
  selected: Array<Obj | Character | null>,
  panel: Object,
  speed: SpeedType,
  grid:GridType,
  object: ObjectType
}

const initial:UIState = {
  mode: 'SELECT',
  rotation: 0,
  selected: [],
  panel: {
    hiring:{show:false},
    staff:{show:false},
    orders:{show:false},
    log:{show:false},
    talent:{show:false},
    save:{show:true},
  },
  speed:'NORMAL',
  grid: 'FLOOR',
  object: 'TEST'
}

export default class UIModel{
  state:UIState;
  container: HTMLElement;
  store: {subscribe:Function, getState:Function, dispatch:Function};
  constructor(state:UIState = initial){//, container:HTMLElement){
    this.state = state;

  }
  init(){
    let container = window.game.container; // HACK
    if(!container) throw new Error('I need a container to render in');

    const UIDiv = document.createElement('div');
    container.appendChild(UIDiv);

    this.container = UIDiv;

    this.start();
  }
  start(){
    this.store = createStore(reducer, this.state);
    this.setState();
    this.store.subscribe(this.render.bind(this));
    this.render();
  }
  dispatch(action:Object){
    this.store.dispatch(action)
  }
  render(){
    this.setState();
    this.forceUpdate();
  }
  forceUpdate(){
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
  clearSelected(){
    this.store.dispatch({type:'CLEAR_SELECTED'})
  }

  // update(){
  //   //KEYS
  //   let keys = {
  //     'P': 80,
  //     'O': 79,
  //     'I': 73,
  //     'L': 76,
  //     'R': 82,
  //     'ESC': 27,
  //     'F6': 117
  //   }
  //   if(engine.input.getKeyDown(keys.F6)){
  //     save('quicksave')
  //   }
  //   if(engine.input.getKeyDown(keys.P)){
  //     this.store.dispatch({type:'TOGGLE_HIRING_PANEL'})
  //   }
  //   if(engine.input.getKeyDown(keys.O)){
  //     this.store.dispatch({type:'TOGGLE_ORDERS_PANEL'})
  //   }
  //   if(engine.input.getKeyDown(keys.I)){
  //     this.store.dispatch({type:'TOGGLE_STAFF_PANEL'})
  //   }
  //   if(engine.input.getKeyDown(keys.L)){
  //     this.store.dispatch({type:'TOGGLE_LOG_PANEL'})
  //   }

  //   if(engine.input.getKeyDown(keys.R)){ //rotate
  //       this.store.dispatch({type:'ROTATE'})
  //   }
  //   if(engine.input.getKeyDown(keys.ESC)){ //escape
  //       this.store.dispatch({type:'CHANGE_MODE', id: 'SELECT'})
  //   }
  // }


}
