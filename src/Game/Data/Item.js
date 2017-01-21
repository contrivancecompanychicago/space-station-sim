//@flow
/*
Items are easily movable entities that only have a position
*/
import keys from 'lodash.keys';

export type ItemType = 'TEST'|'INGREDIENTS'

export type ItemDataType = {
  label:string,
  image:any
}

const Items:{[id:ItemType]:ItemDataType} = {
  'TEST': {label: 'test item', image: require('./Item/pizza.png')},
  'INGREDIENTS': {label: 'ingredients', image: require('./Item/pizza.png')},
};

export default Items;

export let Item:{[id:ItemType]:ItemType} = {};
keys(Items).forEach((key) => {Item[key]=key;});
