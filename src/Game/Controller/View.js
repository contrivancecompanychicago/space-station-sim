// @flow

import state from 'Game/state'

export default class ViewController{

  update(){
    //calculate whats under mousey
    // let charManager = getCharacterManager();
    // let char = charManager.getClosestCharacterToPoint(this.state.mousePosition);
    if(state.view.follow){
      state.view.centerOnPoint(state.view.follow.position.rounded);
    }

  }
}