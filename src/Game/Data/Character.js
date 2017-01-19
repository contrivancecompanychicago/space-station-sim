// @flow

import keys from 'lodash.keys';

export type CharacterType =
  'WORKER'|
  'COOK'|
  'WAITER'|
  'CUSTOMER'

export type CharacterDataType = {label:string, tint:string}

const Chars:{[id:CharacterType]: CharacterDataType} = {
  'WORKER': {label: 'worker', tint:'yellow'},
  'COOK': {label: 'cook', tint:'white'},
  'WAITER': {label: 'waiter', tint: 'blue'},
  'CUSTOMER': {label: 'customer', tint: 'green'},
};

export default Chars;

export let Character:{[id:CharacterType]:CharacterType} = {};
keys(Chars).forEach((key) => {Character[key]=key;});
