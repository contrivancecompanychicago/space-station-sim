//@flow

export type TutorialState = {}
import starter from 'Game/Controller/Tutorial/starter'

export default class TutorialModel{
	state:TutorialState
	tutorial: ?Generator<*,*,*>
	constructor(state:TutorialState = {}){ 
		this.state = state;
		this.tutorial = starter();
	}

	save(){

	}
	clear(){

	}
	load(){
		
	}

}