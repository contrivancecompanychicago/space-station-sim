// @flow

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import UI from 'Game/UI';
import save from 'Game/State/save'
import state from 'Game/state'
import engine from 'Game/engine'

export default class UIController {
  container: HTMLElement
  constructor(container: HTMLElement) {
    // this.container = container;
    if (!container) throw new Error('I need a container to render in');

    const UIDiv = document.createElement('div');
    container.appendChild(UIDiv);

    this.container = UIDiv;

    this.addKeyListener();

    state.ui.store.subscribe(this.render.bind(this))
    this.render()
  }
  render() {
    state.ui.setState()
    this.forceUpdate();
  }
  forceUpdate() {
    ReactDOM.render(<Provider store={state.ui.store}><UI /></Provider>, this.container);
  }

  addKeyListener() {

    window.onkeyup = function (e: Event) {
      // FLOWHACK
      var key: number = e.keyCode ? e.keyCode : e.which;

      //KEYS
      let keys = {
        'P': 80,
        'O': 79,
        'I': 73,
        'L': 76,
        'R': 82,
        'ESC': 27,
        'F6': 117
      }
      if (key === (keys.F6)) {
        save('quicksave')
      }
      if (key === (keys.P)) {
        state.ui.store.dispatch({ type: 'TOGGLE_HIRING_PANEL' })
      }
      if (key === (keys.O)) {
        state.ui.store.dispatch({ type: 'TOGGLE_ORDERS_PANEL' })
      }
      if (key === (keys.I)) {
        state.ui.store.dispatch({ type: 'TOGGLE_STAFF_PANEL' })
      }
      if (key === (keys.L)) {
        state.ui.store.dispatch({ type: 'TOGGLE_LOG_PANEL' })
      }

      if (key === (keys.R)) { //rotate
        state.ui.store.dispatch({ type: 'ROTATE' })
      }
      if (key === (keys.ESC)) { //escape
        state.ui.store.dispatch({ type: 'CHANGE_MODE', id: 'SELECT' })
      }
    }
  }
  update() {
  }

}