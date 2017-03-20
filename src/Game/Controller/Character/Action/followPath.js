//@flow

import type Character from 'Game/Type/Character'
import type Block from 'Game/Block'

import moveToBlockCenter from './moveToBlockCenter'

export default function* followPath(char: Character, path: Array<Block>): Generator<*,*,*>{
    char.setPath(path);
    while(path.length>0) {
        let target = path.shift();
        yield * moveToBlockCenter(char, target);
    }
}
