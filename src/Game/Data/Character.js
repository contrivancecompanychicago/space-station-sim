import keys from 'lodash.keys';

const Chars = {
  'WORKER': {label: 'worker'},
  'COOK': {label: 'cook'},
  'WAITER': {label: 'waiter'},
};

export default Chars;

export let Character = {};
keys(Chars).forEach((key) => {Character[key]=key;});
