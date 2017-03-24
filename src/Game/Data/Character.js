// @flow

import Animation from './Character/Animation'

import DataMap from 'Game/Data/Map'

import { keys } from 'lodash';

export type CharacterType =
	'WORKER' |
	'COOK' |
	'WAITER' |
	'CUSTOMER'

export type directionalAnimationSet = {
	left: Animation,
	right: Animation,
	up: Animation,
	down: Animation,
}
export type CharacterDataType = { label: string, tint: string, walk: directionalAnimationSet, stand: directionalAnimationSet }

const CharMap: DataMap<CharacterType, CharacterDataType> = new DataMap();

let stand = {
	left: new Animation([require('././Character/stand/StillSideLeft_v1.png')]),
	right: new Animation([require('././Character/stand/StillSide_v1.png')]),
	up: new Animation([require('././Character/stand/StillBack_v1.png')]),
	down: new Animation([require('././Character/stand/Still_v1.png')]),
}

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


const Chars: { [id: CharacterType]: CharacterDataType } = {
	'WORKER': { label: 'worker', tint: 'yellow', stand: stand, walk: walk, image: require('./Character/walk/left/sprite_0.png') },
	'CUSTOMER': { label: 'customer', tint: 'green', stand: stand, walk: walk, image: require('./Character/char4.png') },
};

// export default Chars;

export let Character: { [id: CharacterType]: CharacterType } = {};
keys(Chars).forEach((key) => {
	Character[key] = key;
	CharMap.put(key, Chars[key])
});

export default CharMap;