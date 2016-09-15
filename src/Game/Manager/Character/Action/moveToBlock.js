import config from 'Game/config';
import time from 'Game/time';

export default function* moveToBlock(char, block){
  
  let target = block.center;
  while(!char.position.block.is(block)){
    let amount = time.deltaTime * config.character.speed;
    let dir = Math.atan2(target.y - char.position.y, target.x - char.position.x);
    char.position.x += Math.cos(dir)*amount;
    char.position.y += Math.sin(dir)*amount;
    yield;
  }

}
