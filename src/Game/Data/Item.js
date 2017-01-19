/*
Items are easily movable entities that only have a position
*/
import keys from 'lodash.keys';

export type ItemType = 'TEST'

export type ModeDataType = {
  label:string
}

const Items:{[id:ModeType]:ModeDataType} = {
  'TEST': {label: 'test item'},
};

export default Items;

export let Item:{[id:ModeType]:ModeType} = {};
keys(Items).forEach((key) => {Item[key]=key;});
