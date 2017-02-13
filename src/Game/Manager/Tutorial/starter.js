// @flow

import * as engine from 'Game/engine'

import state from 'Game/state'

import type {AbilityType} from 'Game/Data/Object/Ability'

export default function* tutorial():Generator<*,*,*> {

    let uiManager = engine.getUIManager()
    let objectManager = engine.getObjectManager()

    // console.log('starting tutorial');

    
    yield *nextText('Eyy itsa me, ™™™™™PAPA GIOVANNI!')
    yield *nextText('Welcome-a to-a my-a restaurant-a')
    yield *nextText('I like-a pizza')
    yield *nextText('You like-a pizza?')
    yield *nextText('Good, you run my restaurant business')
    yield *nextText('first you need-a the oven')

    highlight([
        'button-mode-object',
        'button-object-Oven',
    ])
    showText('make an oven')
    yield *reqAbility('OVEN')

    highlight([])
    
    yield *nextText('oh you got-sa the oven')
    yield *nextText('now you need-a the fridge')

    showText('make a fridge')
    yield *reqAbility('FRIDGE')
    
    yield *nextText('eyy dat-sa good fridge')

    showText('and a prep table')
    yield *reqAbility('PREP_TABLE')

    yield *nextText('you need-a some-a staff all up in this bitch')

    showText('open the hiring panel')
    highlight([
        'button-mode-panels',
        'button-panel-Hiring'
        ])
    while(state.UI.panel.hiring.show == false) yield;

    highlight([])



    showText('hire a cook')
    yield *reqStaff('COOK');
    

    yield *nextText('eyy eyyyy dat-sa good-a but you need-a da waiter too')


    showText('hire a waiter')
    yield *reqStaff('WAITER');


    yield *nextText('now hurry up and make some cash money biatch these hos dont pay themselves')

    uiManager.dispatch({'type': 'HIDE_TUTORIAL'})
}

function showText(text:string){
    let uiManager = engine.getUIManager()
    uiManager.dispatch({type: 'SHOW_TUTORIAL', text: text})
}

function* reqAbility(ability:AbilityType):Generator<*,*,*>{
    let objectManager = engine.getObjectManager()
    while(objectManager.getObjectsWithAbility(ability).length == 0){
        yield;
    }
}

function* nextText(text:string):Generator<*,*,*>{
    let uiManager = engine.getUIManager()
    let next = false;
    uiManager.dispatch({type: 'SHOW_TUTORIAL', text: text, next:()=>{next = true}})
    while(!next) yield;
}
function* reqStaff(type:string):Generator<*,*,*>{
    let characterManager = engine.getCharacterManager()
    let cooks = []
    do{
        cooks = characterManager.getChars().filter((c) => {
            return (c.type == type)
        });
        yield;
    }while(cooks.length == 0)

    // console.log('charmanger gett chars', cooks);
    yield;
}

function highlight(elements:Array<string> = []){
    let uiManager = engine.getUIManager()
    uiManager.dispatch({'type': 'HIGHLIGHT', elements:elements})
}