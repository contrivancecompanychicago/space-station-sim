// @flow

import placeItemOnBlock from './placeItemOnBlock';
import shortestPathToObject from './shortestPathToObject';
import pathToBlock from './pathToBlock';

import state from 'Game/state';

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block';

export default function* putItemOnBlock(char:Character, block:Block):Generator<*,*,*>{

	let obj = state.object.getObjectAtBlock(block);

	if(obj){//REFACTOR THIS OUT
		yield *shortestPathToObject(char, obj);
	}else{
		yield *pathToBlock(char, block);
	}
	yield *placeItemOnBlock(char, block);
	char.removeItems()


}

