//@flow
/*
Items are easily movable entities that only have a position
*/
import keys from 'lodash.keys';

export type ItemType = 'TEST'|'BASE'|'PIZZAUNCOOKED'|'PIZZA'|'PIZZADONE'|'COFFEE'|'COFFEEDONE'

export type ItemDataType = {
  label:string,
  image:any
}

const Items:{[id:ItemType]:ItemDataType} = {
  'TEST': {label: 'test item', image: require('./Item/pizza.png')},
  'BASE': {label: 'ingredients', image: require('./Item/pizzabase.png')},
  'PIZZAUNCOOKED': {label: 'ingredients', image: require('./Item/pizzauncooked.png')},
  'PIZZA': {label: 'ingredients', image: require('./Item/pizza.png')},
  'PIZZADONE': {label: 'ingredients', image: require('./Item/pizza.png')},
  'COFFEE': {label: 'ingredients', image: require('./Item/pizza.png')},
  'COFFEEDONE': {label: 'ingredients', image: require('./Item/pizza.png')},
};

export default Items;

export let Item:{[id:ItemType]:ItemType} = {};
keys(Items).forEach((key) => {Item[key]=key;});
