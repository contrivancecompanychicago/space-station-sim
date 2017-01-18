/*
Items are easily movable entities that only have a position
*/
import keys from 'lodash.keys';
const Items = {
  'TEST': {label: 'test item'},
};

export default Items;

export let Item = {};
keys(Items).forEach((key) => {Item[key]=key;});
