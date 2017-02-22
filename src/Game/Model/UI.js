// @flow

/*
UI Manager

UI is a react redux application

maintains a state that is used by a tonne of other things
 - renderings potential changeState
 - making changeState


*/

import { createStore } from 'redux';
// import UI from 'Game/UI';
import reducer from 'Game/UI/reducer';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { keys, assign } from 'lodash';

import save from 'Game/State/save'

import engine from 'Game/engine'

import Component from 'Imagine/Component'

import type Obj from 'Game/Type/Object'
import type Character from 'Game/Type/Character'
import {SpeedType} from 'Game/Data/Speed'

import type {GridType} from 'Game/Data/Grid'
import type {ObjectType} from 'Game/Data/Object'
import type {ModeType} from 'Game/Data/Mode'
import type {ItemType} from 'Game/Data/Item'
import type {CharacterType} from 'Game/Data/Character'

export type UIState = {
  mode: ModeType,
  rotation: number,
  selected: Array<Obj | Character | null>,
  panel: Object,
  speed: SpeedType,
  grid:GridType,
  object: ObjectType,
  item: ItemType,
  character:CharacterType
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
  object: 'TEST',
  character: 'COOK',
  item: 'TEST'
}

export default class UIModel{
  state:UIState;
  store: {subscribe:Function, getState:Function, dispatch:Function};
  constructor(state:UIState = initial){//, container:HTMLElement){
    this.state = state;
    this.store = createStore(reducer, this.state);
    this.setState();

  }
  dispatch(action:Object){
    this.store.dispatch(action)
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



}
