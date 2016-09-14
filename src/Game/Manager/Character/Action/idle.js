
import time from 'Game/time';

export default function* idle(char, duration){
  if(!duration) duration = Math.random()*2;
  while(duration>0){
    duration -= time.deltaTime;//countdown
    yield;
  }
}
