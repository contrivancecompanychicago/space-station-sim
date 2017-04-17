// @flow


import Character from 'Game/Type/Character';
import { keys, defaults, values } from 'lodash';
import state from 'Game/state'
import Point from 'Game/Point'
import Ability from 'Game/Data/Object/Ability'
import Block from 'Game/Block'

export type CharacterState = {
	[id: string]: Character
}

export default class CharacterModel {
	state: CharacterState
	constructor() {
		this.state = {};
	}

	addChar(char: Character) {
		this.state[char.id] = char;
	}

	removeCharacter(char: Character) {
		delete this.state[char.id]
	}

	getChars(): Array<Character> {
		return values(this.state)
	}


	getClosestCharacterToPoint(p: { x: number, y: number }, min:?number):?Character{
		if(!min){
			min = Infinity;
		} else{
			min = Math.pow(min, 2);
		}
		let closestDist = min;
		let closest: Character;
		values(this.state).forEach((c: Character) => {
			let diff = {
				x: c.position.x - p.x,
				y: c.position.y - p.y,
			}
			let dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
			if (dist < closestDist) {
				closestDist = dist;
				closest = c
			}
		})
		return closest;
	}

	hireCharacter(char:Character){
		state.player.spendMoney(char.salary)
		this.spawnCharacter(char);
		this.generateHireableChars();
		state.view.followCharacter(char);
		state.ui.dispatch({type:'SET_SELECTED', selected:char})
	}

	spawnCharacter(char:Character){
		let spawnPoints = state.object.getObjectsWithAbility(Ability.SPAWN)
		if (spawnPoints.length > 0) {
			let pt = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
			char.position = pt.block.center;
			this.addChar(char)
		} else {
			console.log("NO PLACE TO SPAWN");
		}
	}

	spawnCustomer(){ //USED BY TESTS
		// debugger;
		let spawnPoints = state.object.getObjectsWithAbility(Ability.SPAWN);
		if(spawnPoints.length>0){
			let sp = spawnPoints[0]
			let char = new Character({ position: sp.block.center, type: 'CUSTOMER' })
			this.addChar(char);
		}else{
			throw new Error('no spawn points')
		}
	}

	getChar(id:string):Character{
		return this.state[id];
	}

	_hireableChars: Array < Character >;
	getHireableChars():Array < Character > {
		if(!this._hireableChars){
			this.generateHireableChars();
		}
		return this._hireableChars
	}
	generateHireableChars(){
		this._hireableChars = []
		for (let i = 0; i < 3; i++) {
			this._hireableChars.push(this.makeHireableChar())
		}
	}

	makeHireableChar():Character {
		let char = new Character({ type: 'WORKER', position: new Point({x:0, y:0}) });
		return char
	}

	save():Object{
		return this.state;
	}
	
	clear(){
		this.state = {}
	}
	
	load(obj:Object){
		values(obj).forEach((c)=> {
			c.position = new Point(c.position);
			c.path = c.path.map(b=>new Block(b));
			delete c.action;
			this.addChar(new Character(c));
		})
	}

	getCharactersAtBlock(block:Block):Array<Character>{
		return this.getChars().filter(c => {
			return block.is(c.position.block);
		})
	}

}