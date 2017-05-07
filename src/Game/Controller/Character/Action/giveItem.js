//@flow

// import actions from './index'
import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Obj from 'Game/Type/Object'
import type Block from 'Game/Block'
import type Item from 'Game/Item'

import state from 'Game/state'

import pickUpItem from './pickUpItem'
import pathToBlock from './pathToBlock'
import wanderToAdjacentTile from './wanderToAdjacentTile'

export default function* giveItem(char: Character, item: Item, target:Character): Generator<*,*,*>{

	yield * pickUpItem(char, item);
	yield * pathToBlock(char, target.position.block);
	//give to customer
	char.removeItem(item);
	target.addItem(item);

}
