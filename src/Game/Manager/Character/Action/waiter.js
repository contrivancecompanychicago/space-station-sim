//@flow
import actions from './index'


import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'

import state from 'Game/state'
// import {getLogManager, getGridManager, getObjectManager, getItemManager, getOrderManager} from 'Game/engine'

import {Tasks} from 'Game/Data/Task'

export default function* waiter(char:Character):Generator<*,*,*>{
  let gridManager = state.grid
  let objectManager = state.object
  let itemManager = state.item
  let orderManager = state.order
  let logManager = state.log


  // let objs = objectManager.getObjectsWithItemType('TEST')

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
