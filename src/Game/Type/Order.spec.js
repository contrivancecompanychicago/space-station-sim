// @flow

// import makeOrder, {nextStep} from './makeOrder'

import state from 'Game/state'
import Character from 'Game/Type/Character'
import Order from 'Game/Type/Order'
import Item from 'Game/Type/Item'

describe('Type/Order', () => {
    let char:Character;
    let order:Order;
    let item: Item
    beforeEach(() => {
        state.init();
        char = new Character();
        order = new Order({type:'PIZZA'});
        state.character.addChar(char);
        state.order.addOrder(order);
    })

    describe('nextStep', () => {

        it('should return base if no item', () => {
            expect(order.nextStep()).toBe('BASE')
        })
        it('should return PIZZAUNCOOKED if there is a base', () => {
            item = new Item({type:'BASE'});
            state.item.addItem(item);
            order.setItem(item);
            expect(order.nextStep()).toBe('PIZZAUNCOOKED')
        })
        it('should return PIZZA if there is a uncooked', () => {
            item = new Item({type:'PIZZAUNCOOKED'});
            state.item.addItem(item);
            order.setItem(item);
            expect(order.nextStep()).toBe('PIZZA')
        })
        it('should return undefined if the pizza is already made', () => {
            
            item = new Item({type:'PIZZA'});
            state.item.addItem(item);
            order.setItem(item);
            expect(order.nextStep()).not.toBeDefined()
        })

    })
})