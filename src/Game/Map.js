//@flow
// map generator

import noise from 'simplex-noise';
const simplex = new noise();

import type State from 'Game/state'

import Grid from 'Game/Type/Grid'
export default function genMap(state:State){
	for(let x = 0; x< 10; x++){
		for(let y = 0; y< 10; y++){
			let n = simplex.noise2D(1, 1);
			state.grid.addNode(x,y, new Grid({type: 'FLOOR'}))
		}
	}
}

