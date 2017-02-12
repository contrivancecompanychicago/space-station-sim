//@flow
import Manager from 'Game/Manager'

import type {TutorialState} from 'Game/state'

import starter from './Tutorial/starter'

export default class TutorialManager extends Manager{
    type:string
    tutorial: ?Generator<*,*,*>
    constructor(state:TutorialState){ 
        super();    
        this.state = state;
        this.tutorial = starter();
    }

    update() {
        // console.log('tutorial updating');
        if(this.tutorial){
            let result = this.tutorial.next();
            if(result.done){
                console.log('tutorial done')
                this.tutorial = null;
            }
            
        }
    }
}