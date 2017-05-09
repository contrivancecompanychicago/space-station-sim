//@flow
// map generator

import noise from 'simplex-noise';
const simplex = new noise();

import type State from 'Game/state'

import Rect from 'Game/Rect'
import Point from 'Game/Point'

import Grid from 'Game/Type/Grid'
export default function genMap(state: State) {
	let r = new Rect({ x: 1, y: 1 }, { x: 3, y: 100 })
	fill(state, 'ROAD', r);
	cityBlock(state, new Point({ x: 4, y: 4 }))
}

function cityBlock(state: State, offset: Point) {

	let padding = 2;

	let lens = []
	for (let i = 0; i < 5; i++) {
		lens.push(5 + Math.floor(Math.random() * 4))
	}
	let height = lens.reduce((a,b) => {return a+b}, 0);

	let mid = offset.x + 6 + Math.floor(Math.random() * 4)
	let end = mid + 6 + Math.floor(Math.random() * 4)
	let dist = 0


	fill(state, 'FLOOR', new Rect({
		t:offset.y,
		r:padding+offset.x+end+padding,
		b:padding+offset.y+height+padding,
		l:offset.x}))

	
	offset.x += padding
	offset.y += padding



	lens.forEach(len => {

		drawRoom(state, new Rect(offset.y, offset.x + mid, offset.y + len, offset.x));
		drawRoom(state, new Rect(offset.y, offset.x + end, offset.y + len, offset.x + mid));

		offset.y += len
	})
}

function fill(state: State, type: string, rect: Rect) {
	rect.units.forEach(b => {
		state.grid.addNode(b.x, b.y, new Grid({ type }))
	})
}
function drawRoom(state: State, rect: Rect) {
	fill(state, 'WALLTEST', rect)
	rect = rect.add({ t: 1, r: -1, b: -1, l: 1 })
	fill(state, 'FLOOR', rect)
}

function drawSimplex(state: State, wide: number, high: number): State {
	for (let x = 0; x < wide; x++) {
		for (let y = 0; y < high; y++) {
			let n = simplex.noise2D(x / 10, y / 10);

			let gridParams = { type: 'FLOOR' };
			if (Math.abs(n) < 0.25) gridParams.type = 'WALLTEST'
			state.grid.addNode(x, y, new Grid(gridParams))


		}
	}

}
