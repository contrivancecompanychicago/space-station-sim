//@flow
/*
Items are easily movable entities that only have a position
*/
import keys from 'lodash.keys';

export type ItemType = 'TEST'|'INGREDIENTS'

export type ItemDataType = {
  label:string
}

const Items:{[id:ItemType]:ItemDataType} = {
  'TEST': {label: 'test item'},
  'INGREDIENTS': {label: 'ingredients'},
};

export default Items;

export let Item:{[id:ItemType]:ItemType} = {};
keys(Items).forEach((key) => {Item[key]=key;});
