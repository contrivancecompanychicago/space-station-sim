// @flow
import config from 'Game/config';
import time from 'Game/time';

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block'

import moveToPoint from './moveToPoint'

export default function* moveToBlockCenter(char:Character, block:Block):Generator<*,*,*>{

	yield * moveToPoint(char, block.center);

}
