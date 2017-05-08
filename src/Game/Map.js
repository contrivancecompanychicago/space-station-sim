//@flow
// map generator

import noise from 'simplex-noise';
const simplex = new noise();

import type State from 'Game/state'

import Rect from 'Game/Rect'

import Grid from 'Game/Type/Grid'
export default function genMap(state:State){
	let r = new Rect({x:1,y:1}, {x: 3, y:100})
	fill(state, 'ROAD', r);
}


function fill(state:State, type: string, rect:Rect){
	rect.units.forEach(b => {
		console.log(b)
		state.grid.addNode(b.x, b.y, new Grid({type}))
	})
}

function drawSimplex(state:State, wide:number, high:number):State{
	for(let x = 0; x< wide; x++){
		for(let y = 0; y< high; y++){
			let n = simplex.noise2D(x/10, y/10);

			let gridParams = {type: 'FLOOR'};
			if(Math.abs(n) < 0.25) gridParams.type = 'WALLTEST'
			state.grid.addNode(x,y, new Grid(gridParams))
			

		}
	}

}
