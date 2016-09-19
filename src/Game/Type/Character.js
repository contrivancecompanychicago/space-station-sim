import keys from 'lodash.keys';

const Item = {
  'WORKER': {label: 'worker'},
};

export default Item;

export let Items = {};
keys(Item).forEach((key) => {Items[key]=key;});
