// @flow
import config from 'Game/config';
import time from 'Game/time';

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block'

export default function* moveToBlockCenter(char:Character, block:Block):Generator<*,*,*>{

  let target = block.center;
  // console.log(target, char.position, (char.position.x != target.x), (char.position.y != target.y))
  while((char.position.x != target.x) || (char.position.y != target.y)){
    let amount = time.deltaTime * config.character.speed;
    let dir = Math.atan2(target.y - char.position.y, target.x - char.position.x);

    let distsq = Math.pow(target.y - char.position.y, 2)+Math.pow(target.x - char.position.x, 2)
    let amountsq = Math.pow(amount, 2)
    if(amountsq > distsq){
      //we're there
      char.position.x = target.x
      char.position.y = target.y
    }else{
      char.position.x += Math.cos(dir)*amount;
      char.position.y += Math.sin(dir)*amount;
    }

    char.item.forEach((item) => {
      item.position.x -= (item.position.x - char.position.x) /6
      item.position.y -= (item.position.y - char.position.y) /6
    })

    yield;
  }

}
