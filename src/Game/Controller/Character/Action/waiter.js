//@flow
import actions from './index'


import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'

import state from 'Game/state'


import {Tasks} from 'Game/Data/Task'

export default function* waiter(char:Character):Generator<*,*,*>{

	if(char.hasTaskType(Tasks.SERVEDRINK)){

		yield *actions.serveDrink(char);
	}

	if(char.hasTaskType(Tasks.SERVEFOOD)){
		yield *actions.serveFood(char);
	}

	char.setStatus('waiting for something to do')
	if(Math.random()<0.01)
		yield *actions.wandertoAdjacentTile(char);
	return;

}
