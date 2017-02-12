// @flow

import * as engine from 'Game/engine'

export default function* tutorial():Generator<*,*,*> {

    let uiManager = engine.getUIManager()

    // console.log('starting tutorial');

    
    yield *nextText('Eyy its PAPA GIOVANNI')
    yield *nextText('Welcome-a to-a my-a restaurant-a')
    yield *nextText('I like-a pizza')
    yield *nextText('You like-a pizza?')
    yield *nextText('Good, you run my restaurant business')
    yield *nextText('first you need-a the oven')


    uiManager.dispatch({'type': 'HIDE_TUTORIAL'})
}


function* nextText(text:string):Generator<*,*,*>{
    let uiManager = engine.getUIManager()
    let next = false;
    uiManager.dispatch({type: 'SHOW_TUTORIAL', text: text, next:()=>{next = true}})
    while(!next) yield;
}