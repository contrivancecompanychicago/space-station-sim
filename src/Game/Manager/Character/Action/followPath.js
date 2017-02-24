//@flow

import actions from './index'

import type Character from 'Game/Type/Character'
import type Block from 'Game/Block'

export default function* followPath(char: Character, path: Array<Block>): Generator<*,*,*>{
    while(path.length>0) {
        let target = path.shift();
        yield * actions.moveToBlockCenter(char, target);
    }
}
