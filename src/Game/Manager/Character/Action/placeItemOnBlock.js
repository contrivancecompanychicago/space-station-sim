// @flow
import config from 'Game/config';
import time from 'Game/time';

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block'

export default function* placeItemOnBlock(char:Character, block:Block):Generator<*,*,*>{

  let target = block.center;
  if(char.item.length>0){
    let item = char.item[0]
    let dist = distance(target, item.position);
    let amount = 0;
    while(dist>amount){
      amount = time.deltaTime * config.character.speed;
      let dir = Math.atan2(target.y - char.position.y, target.x - char.position.x);
      item.position.x -= (item.position.x - target.x) /6
      item.position.y -= (item.position.y - target.y) /6
      dist = distance(target, item.position);

      yield;
    }

  }
}

function distance(a,b){
  return Math.sqrt(Math.pow(a.y - b.y, 2)+Math.pow(a.x - b.x, 2))
}
