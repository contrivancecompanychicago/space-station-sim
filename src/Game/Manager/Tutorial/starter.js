// @flow

import * as engine from 'Game/engine'

export default function* tutorial():Generator<*,*,*> {

    let uiManager = engine.getUIManager()
    let objectManager = engine.getObjectManager()

    // console.log('starting tutorial');

    
    yield *nextText('Eyy its PAPA GIOVANNI')
    yield *nextText('Welcome-a to-a my-a restaurant-a')
    yield *nextText('I like-a pizza')
    yield *nextText('You like-a pizza?')
    yield *nextText('Good, you run my restaurant business')
    yield *nextText('first you need-a the oven')


    showText('make an oven')
    while(objectManager.getObjectsWithAbility('OVEN').length == 0){
        yield;
    }

    
    yield *nextText('oh you got-sa the oven')
    yield *nextText('now you need-a the fridge')


    uiManager.dispatch({'type': 'HIDE_TUTORIAL'})
}

function showText(text:string){
    let uiManager = engine.getUIManager()
    uiManager.dispatch({type: 'SHOW_TUTORIAL', text: text})
}

function* nextText(text:string):Generator<*,*,*>{
    let uiManager = engine.getUIManager()
    let next = false;
    uiManager.dispatch({type: 'SHOW_TUTORIAL', text: text, next:()=>{next = true}})
    while(!next) yield;
}