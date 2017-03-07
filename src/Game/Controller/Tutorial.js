//@flow

import state from 'Game/state'

import starter from 'Game/Controller/Tutorial/starter'

export default class TutorialController{
    tutorial: ?Generator<*,*,*>
    constructor(){ 
        this.tutorial = starter();
    }

    update() {
        if(this.tutorial){
            let result = this.tutorial.next();
            if(result.done){
                this.tutorial = null;
            }
        }
    }
}