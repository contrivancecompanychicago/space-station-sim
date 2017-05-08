//@flow
// map generator

import noise from 'simplex-noise';
const simplex = new noise();

import type State from 'Game/state'

import Grid from 'Game/Type/Grid'
export default function genMap(state:State){
	for(let x = 0; x< 100; x++){
		for(let y = 0; y< 100; y++){
			let n = simplex.noise2D(x/10, y/10);

			let gridParams = {type: 'FLOOR'};
			if(Math.abs(n) < 0.25) gridParams.type = 'WALLTEST'
			state.grid.addNode(x,y, new Grid(gridParams))
			

		}
	}
}

