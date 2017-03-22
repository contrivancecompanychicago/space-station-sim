// @flow

import Animation from './Character/Animation'

import DataMap from 'Game/Data/Map'

import {keys} from 'lodash';

export type CharacterType =
	'WORKER'|
	'COOK'|
	'WAITER'|
	'CUSTOMER'

export type CharacterDataType = {label:string, tint:string, walk:{
	left:Animation,
	right:Animation,
	up:Animation,
	down:Animation,
}}

const CharMap:DataMap<CharacterType, CharacterDataType> = new DataMap();

let walk = {
	left: new Animation([
		require('./Character/walk/left/sprite_0.png'),
		require('./Character/walk/left/sprite_1.png'),
		require('./Character/walk/left/sprite_2.png'),
		require('./Character/walk/left/sprite_3.png'),
		require('./Character/walk/left/sprite_4.png'),
		]),
	right: new Animation([
		require('./Character/walk/right/right_0.png'),
		require('./Character/walk/right/right_1.png'),
		require('./Character/walk/right/right_2.png'),
		require('./Character/walk/right/right_3.png'),
		require('./Character/walk/right/right_4.png'),
		]),
	up: new Animation([
		require('./Character/walk/up/up_0.png'),
		require('./Character/walk/up/up_1.png'),
		require('./Character/walk/up/up_2.png'),
		require('./Character/walk/up/up_3.png'),
		]),
	down: new Animation([
		require('./Character/walk/down/down_0.png'),
		require('./Character/walk/down/down_1.png'),
		require('./Character/walk/down/down_2.png'),
		require('./Character/walk/down/down_3.png'),
		]),
}


const Chars:{[id:CharacterType]: CharacterDataType} = {
	'WORKER': {label: 'worker', tint:'yellow', walk:walk, image:require('./Character/walk/left/sprite_0.png')},
	'CUSTOMER': {label: 'customer', tint: 'green', walk:walk, image:require('./Character/char4.png')},
};

// export default Chars;

export let Character:{[id:CharacterType]:CharacterType} = {};
keys(Chars).forEach((key) => {
	Character[key]=key;
	CharMap.put(key, Chars[key])
});

export default CharMap;