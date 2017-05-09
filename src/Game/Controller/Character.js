// @flow

import state from 'Game/state'
import {keys} from 'lodash';
import Ability from 'Game/Data/Object/Ability'

import time from 'Game/time'

import Character from 'Game/Type/Character'
import customer from 'Game/Controller/Character/Action/customer'
import worker from 'Game/Controller/Character/Action/worker'

const spawnGap = 2;

export default class CharacterController{
	spawnTimer:number;
	constructor(){
		this.spawnTimer = spawnGap;
	}
	update(){
		state.character.getChars().forEach( char => {
			//detect if it moved
			let orig = {x:char.position.x, y:char.position.y};

			if (!char.action) {
				this.newAction(char);
			}else{
				if (char.action.next().done) { ///CALLS NEXT HERE
					this.newAction(char);
				}
			}
			char.movedThisFrame = !((orig.x==char.position.x)&&(orig.y==char.position.y))

		});
		this.spawnUpdate()
		
	}
	spawnUpdate(){
		this.spawnTimer -= time.deltaTime;
		if(this.spawnTimer<=0){
			this.spawnTimer += spawnGap;
			let spawnPoints = state.object.getObjectsWithAbility(Ability.SPAWN)
			if(spawnPoints.length>0){
				let sp = spawnPoints[Math.floor(Math.random()*spawnPoints.length)];
				let char = new Character({ position: sp.block.center, type: 'CUSTOMER' })
				state.character.addChar(char);
			}
		}
	}
	newAction(char:Character){

		switch (char.type) {
			case 'CUSTOMER':
				char.action = customer(char);
				break;
			default:
				char.action = worker(char);
		}
	}

}