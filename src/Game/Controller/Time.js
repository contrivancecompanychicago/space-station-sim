// @flow


import state from 'Game/state'
import Speed from 'Game/Data/Speed';

import Time from 'Game/time'

export default class TimeController {

	//TODO: make up your mind between state.time.speed and game/time.speed

	update(time: Object) {
		if (time.deltaTime > 1) {
			//TIME SPIKE
			//user probably changed tabs
			time.deltaTime = 0;
		}
		let speed = Speed[state.ui.state.speed] || { speed: 1 }
		state.time.deltaTime = time.deltaTime * speed.speed;
		Time.deltaTime = state.time.deltaTime;
		state.time.state.currentTime += state.time.deltaTime * 200
	}
}