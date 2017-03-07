// @flow

import state from 'Game/state'
export default function clear(){
	state.item.clear();
	state.character.clear();
	state.object.clear();
	state.grid.clear();
	state.order.clear();
	state.player.clear();
	state.task.clear();
	state.time.clear();
}