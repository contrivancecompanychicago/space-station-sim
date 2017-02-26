// @flow
import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'
import state from 'Game/state'
import actions from './index'

export default function* shortestPathToObject(char: Character, obj: Obj): Generator<*,*,*>{
	let shortestPathLength = Infinity;
	let shortestPath: Array<Block>;
	obj.getAccessBlocks().forEach(b => {
		let path = state.grid.getPath(char.position.block, b)
		if (path.length > 0 && path.length < shortestPathLength) {
			shortestPathLength = path.length;
			shortestPath = path;
		}
	})
	if(shortestPath) {
		yield * actions.followPath(char, shortestPath)
	}else{
		throw new Error('path not found serveOrder')
	}
}