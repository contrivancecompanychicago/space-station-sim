//@flow
import * as engine from 'Game/engine';

import state from 'Game/state'


import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import type Obj from 'Game/Type/Object'

import type {RecipeType} from 'Game/Data/Recipe'

import Order from 'Game/Type/Order'

import pathToObjectWithAbility from './pathToObjectWithAbility'
import moveToBlockCenter from './moveToBlockCenter'
import placeItemOnBlock from './placeItemOnBlock'
import idle from './idle'


export default function* customer(char: Character): Generator<*,*,*>{

	char.setStatus('Sitting down')
	let chair = yield * pathToObjectWithAbility(char, Ability.CHAIR);
	if(chair) {
		chair.setCharacter(char)
		yield * moveToBlockCenter(char, chair.block)

		//PLACE ORDER!
		let orders: Array<Order> = []
		//check existing
		orders = state.order.getOrders().filter(o => {
			return o.getCustomer() == char;
		});
		if(orders.length == 0){
			let pizza = new Order({ customer: char.id, type: 'PIZZA', recipe: 'MARGHERITA' })
			orders.push(pizza)
			state.order.addOrder(pizza);
			let coffee = new Order({ customer: char.id, type: 'COFFEE', recipe:'COFFEE' })
			orders.push(coffee)
			state.order.addOrder(coffee);
		}


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
				table = state.object.getObjectAtBlock(check);
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
				yield * placeItemOnBlock(char, table.block)
			}

		}
		chair.removeCharacter();
		char.setStatus('Eating')
		yield * idle(char, 5);
		state.player.addMoney(20)
		
		
		while (char.getItems().length > 0) {
			let item = char.getItems()[0];
			state.item.removeItem(item);
			char.removeItem(item);
		}
		char.setStatus('Leaving')
		yield * pathToObjectWithAbility(char, Ability.SPAWN)

	}else{
		char.setStatus('Nowhere to sit')
		yield *pathToObjectWithAbility(char, Ability.SPAWN)
	}

	char.setStatus('Gone')

	state.character.removeCharacter(char);

}
