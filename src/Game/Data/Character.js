// @flow


import DataMap from 'Game/Data/Map'

import keys from 'lodash.keys';

export type CharacterType =
  'WORKER'|
  'COOK'|
  'WAITER'|
  'CUSTOMER'

export type CharacterDataType = {label:string, tint:string}

const CharMap:DataMap<CharacterType, CharacterDataType> = new DataMap();

const Chars:{[id:CharacterType]: CharacterDataType} = {
  'WORKER': {label: 'worker', tint:'yellow', image:require('./Character/char1.png')},
  'COOK': {label: 'cook', tint:'white', image:require('./Character/char5.png')},
  'WAITER': {label: 'waiter', tint: 'blue', image:require('./Character/char3.png')},
  'CUSTOMER': {label: 'customer', tint: 'green', image:require('./Character/char4.png')},
};

// export default Chars;

export let Character:{[id:CharacterType]:CharacterType} = {};
keys(Chars).forEach((key) => {
  Character[key]=key;
  CharMap.put(key, Chars[key])
});

export default CharMap;