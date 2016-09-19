/*
Items are easily movable entities that only have a position
*/
import keys from 'lodash.keys';
const Item = {
  'TEST': {label: 'test item'},
};

export default Item;

export let Items = {};
keys(Item).forEach((key) => {Items[key]=key;});
