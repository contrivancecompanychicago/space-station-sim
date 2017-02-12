// @flow

import * as engine from 'Game/engine'

export default function* tutorial():Generator<*,*,*> {

    let uiManager = engine.getUIManager()

    // console.log('starting tutorial');

    let next = false;
    uiManager.dispatch({type: 'SHOW_TUTORIAL', text: 'Eyy its PAPA GIOVANNI', next:()=>{next = true}})
    while(!next) yield;

    next = false;
    uiManager.dispatch({type: 'SHOW_TUTORIAL', text: 'Welcome-a to-a my-a restaurant-a', next:()=>{next = true}})
    while(!next) yield;

    uiManager.dispatch({'type': 'HIDE_TUTORIAL'})
}
