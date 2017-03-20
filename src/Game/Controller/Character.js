// @flow

import state from 'Game/state'
import {keys} from 'lodash';
import Ability from 'Game/Data/Object/Ability'

import Character from 'Game/Type/Character'
import customer from 'Game/Controller/Character/Action/customer'
import worker from 'Game/Controller/Character/Action/worker'

export default class CharacterController{

	update(){
		state.character.getChars().forEach( char => {
			if (!char.action) {
				this.newAction(char);
			}else{
				// FLOWHACK action is set in previous if
				if (char.action.next().done) { ///CALLS NEXT HERE
					this.newAction(char);
				}

			}
		});
		this.spawnUpdate()
		
	}
	spawnUpdate(){
		//spawn;
		let spawnPoints = state.object.getObjectsWithAbility(Ability.SPAWN)
		spawnPoints.forEach((sp) => {
			if (Math.random() < 0.0004) {
				let char = new Character({ position: sp.block.center, type: 'CUSTOMER' })

				state.character.addChar(char);

			}
		})
	}
	newAction(char:Character){
		let task = state.task.getUnassignedTask();
		if (task) {
			state.task.assignTask(task.id, char.id);
			char.task = task.id;
			char.action = actions.task(char);
			return;
		}

		switch (char.type) {
			case 'CUSTOMER':
				char.action = customer(char);
				break;
			default:
				char.action = worker(char);
		}
	}

}