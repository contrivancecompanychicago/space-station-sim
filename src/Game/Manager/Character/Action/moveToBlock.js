import config from 'Game/config';
import time from 'Game/time';

export default function* moveToBlock(char, block){


  let target = block.center;
  let amount = time.deltaTime * config.character.speed;
  const dir = Math.atan2(target.y - char.y, target.x - char.x);
  char.x += Math.cos(dir)*amount;
  char.y += Math.sin(dir)*amount;

}
