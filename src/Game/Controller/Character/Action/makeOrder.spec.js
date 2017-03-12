// @flow

import makeOrder, {nextStep} from './makeOrder'

import state from 'Game/state'
import Character from 'Game/Type/Character'
import Order from 'Game/Type/Order'
import Item from 'Game/Type/Item'

describe('actions/makeOrder', () => {
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

    it('should be a function', () => {
        expect(typeof makeOrder).toBe('function');
    })
    describe('nextStep', () => {

        it('should return base if no item', () => {
            expect(nextStep(order)).toBe('BASE')
        })
        it('should return PIZZAUNCOOKED if there is a base', () => {
            item = new Item({type:'BASE'});
            state.item.addItem(item);
            order.setItem(item);
            expect(nextStep(order)).toBe('PIZZAUNCOOKED')
        })
        it('should return PIZZA if there is a uncooked', () => {
            item = new Item({type:'PIZZAUNCOOKED'});
            state.item.addItem(item);
            order.setItem(item);
            expect(nextStep(order)).toBe('PIZZA')
        })
        it('should return ??? if the pizza is already made', () => {
            
            item = new Item({type:'PIZZA'});
            state.item.addItem(item);
            order.setItem(item);
            expect(nextStep(order)).toBe(false)
        })

    })
    it('should do something', () => {
        let gen = makeOrder(char, order);
        gen.next();
    })
})