// @flow

import keys from 'lodash.keys';

const Chars:{[id:string]: {label:string, tint:string}} = {
  'WORKER': {label: 'worker', tint:'yellow'},
  'COOK': {label: 'cook', tint:'white'},
  'WAITER': {label: 'waiter', tint: 'blue'},
  'CUSTOMER': {label: 'customer', tint: 'green'},
};

export default Chars;

export let Character = {};
keys(Chars).forEach((key) => {Character[key]=key;});

export type CharacterType =
  'WORKER'|
  'COOK'|
  'WAITER'|
  'CUSTOMER'
