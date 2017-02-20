// @flow

import save from 'Game/State/save'
import state from 'Game/state'
import engine from 'Game/engine'

export default class UIController{

  constructor() {
    window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
      console.log("fix ui controller", key);
      
    }
  }
  update(){
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
  //   if(engine.input.getKeyDown(keys.F6)){
  //     save('quicksave')
  //   }
  //   if(engine.input.getKeyDown(keys.P)){
  //     state.ui.store.dispatch({type:'TOGGLE_HIRING_PANEL'})
  //   }
  //   if(engine.input.getKeyDown(keys.O)){
  //     state.ui.store.dispatch({type:'TOGGLE_ORDERS_PANEL'})
  //   }
  //   if(engine.input.getKeyDown(keys.I)){
  //     state.ui.store.dispatch({type:'TOGGLE_STAFF_PANEL'})
  //   }
  //   if(engine.input.getKeyDown(keys.L)){
  //     state.ui.store.dispatch({type:'TOGGLE_LOG_PANEL'})
  //   }

  //   if(engine.input.getKeyDown(keys.R)){ //rotate
  //       state.ui.store.dispatch({type:'ROTATE'})
  //   }
  //   if(engine.input.getKeyDown(keys.ESC)){ //escape
  //       state.ui.store.dispatch({type:'CHANGE_MODE', id: 'SELECT'})
  //   }
  }

}