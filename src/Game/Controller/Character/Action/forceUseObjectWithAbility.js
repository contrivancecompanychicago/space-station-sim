//@flow

import type Character from 'Game/Type/Character'
import type {AbilityType } from 'Game/Data/Object/Ability'
import type Obj from 'Game/Type/Object'
import actions from './index'
import state from 'Game/state'
import type Block from 'Game/Block'

import findObjects from './findObjects';
import followPath from './followPath';
import placeItemOnBlock from './placeItemOnBlock';


export default function* forceUseObjectWithAbility(char: Character, ability: AbilityType): Generator<*,Obj,*>{
	let shortestPathLength = Infinity
	let shortestPath:Array<Block>
	let shortestPathObject:Obj

	let obj = char.getObject(); //OVERRIDE

	let objs = yield * findObjects((o: Obj) => {
		if (o.getCharacter() == char) {
			obj = o
			return true; //to break eternal loop in findobject //refactor
		};
		if (o.character) return false;
		if (o.item) return false;
		return o.hasAbility(ability)
	})

	if(obj) {
		objs = [obj]
	}

	objs.forEach(o => {
		o.getAccessBlocks().forEach(b => {
			let path = state.grid.getPath(char.position.block, b);
			if (path.length > 0 && path.length < shortestPathLength) {
				shortestPathLength = path.length;
				shortestPath = path;
				shortestPathObject = o;
			}
		})
	})
	if(shortestPathObject&&shortestPath) {
		shortestPathObject.setCharacter(char);
		yield * followPath(char, shortestPath);
		yield * placeItemOnBlock(char, shortestPathObject.block)
		shortestPathObject.removeCharacter();
		return shortestPathObject
	}else{
		throw new Error('cant find path in forceUseObjectWithAbility')
	}

}
