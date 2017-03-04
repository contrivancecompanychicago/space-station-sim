//@flow
import * as engine from 'Game/engine';

import state from 'Game/state'

import actions from './index'

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

import Order from 'Game/Type/Order'
export default function* customer(char: Character): Generator<*,*,*>{

	let itemManager = state.item
  let gridManager = state.grid
  let objectManager = state.object
  let orderManager = state.order
  let charManager = state.character
  
  char.setStatus('Sitting down')
  let chair = yield * actions.pathToObjectWithAbility(char, Ability.CHAIR);
	if(chair) {
		chair.setCharacter(char)
		yield * actions.moveToBlockCenter(char, chair.block)

		//PLACE ORDER!
		let orders: Array<Order> = []

		let pizza = new Order({ customer: char, type: 'PIZZA' })
		orders.push(pizza)
		orderManager.addOrder(pizza);
		let coffee = new Order({ customer: char, type: 'COFFEE' })
		orders.push(coffee)
		orderManager.addOrder(coffee);


		//check for table;
		let checks = [
			{ x: 1, y: 0 },
			{ x: -1, y: 0 },
			{ x: 0, y: -1 },
			{ x: 0, y: 1 },
		]
		let table
		checks.forEach(c => {
			let check = char.position.block
			check.x += c.x
			check.y += c.y
			if (!table) {
				table = objectManager.getObjectAtBlock(check);
				if (table) {
					if (!table.hasAbility('DINE_TABLE')) {
						table = null;
					}
				}
			}
		})


		let numFulfilled = 0;
		while (numFulfilled !== orders.length) {
			char.setStatus('waiting for order (' + numFulfilled + '/' + orders.length + ')')
			numFulfilled = 0;
			orders.forEach((o) => {
				if (o.status === 'FULFILLED') numFulfilled++;
			})
			yield; //wait til I get my shit.
			if (table) {
				yield * actions.placeItemOnBlock(char, table.block)
			}

		}
		chair.removeCharacter();
		char.setStatus('Eating')
		yield * actions.idle(char, 5);
		state.player.addMoney(20)
		while (char.item.length > 0) {
			let item = char.item[0];
			itemManager.removeItem(item);
			char.removeItem(item);
		}
		char.setStatus('Leaving')
		yield * actions.pathToObjectWithAbility(char, Ability.SPAWN)

	}else{
		char.setStatus('Nowhere to sit')
		yield *actions.pathToObjectWithAbility(char, Ability.SPAWN)
	}
  // yield *actions.wander(char);

  //WIPE CLEAN - hacky


	char.setStatus('Gone')

	charManager.removeCharacter(char);




}
