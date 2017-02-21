//@flow

export type TutorialState = {}
import starter from 'Game/Manager/Tutorial/starter'

export default class TutorialModel{
    state:TutorialState
    tutorial: ?Generator<*,*,*>
    constructor(state:TutorialState = {}){ 
        this.state = state;
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