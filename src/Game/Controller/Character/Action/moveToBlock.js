// @flow
import config from 'Game/config';
import time from 'Game/time';

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block'

export default function* moveToBlock(char:Character, block:Block):Generator<*,*,*>{

  let target = block.center;
  while(!char.position.block.is(block)){
    let amount = time.deltaTime * config.character.speed;
    let dir = Math.atan2(target.y - char.position.y, target.x - char.position.x);
    char.position.x += Math.cos(dir)*amount;
    char.position.y += Math.sin(dir)*amount;
    char.getItems().forEach((item) => {
      item.position.x -= (item.position.x - char.position.x) /6
      item.position.y -= (item.position.y - char.position.y) /6

    })

    yield;
  }

}
