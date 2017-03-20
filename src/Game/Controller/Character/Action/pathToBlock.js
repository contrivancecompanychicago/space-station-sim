// @flow
import engine from 'Game/engine';

// import actions from './index'

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block'
import state from 'Game/state'

import followPath from './followPath'

export default function* pathToBlock(char: Character, block: Block): Generator<*,*,*>{
	let current = char.position.block;
	let path = state.grid.getPath(current, block);
	yield * followPath(char, path);
}
