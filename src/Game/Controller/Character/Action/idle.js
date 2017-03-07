// @flow
import time from 'Game/time';
import type Character from 'Game/Type/Character';

export default function* idle(char:Character, duration:number):Generator<*,*,*>{
  if(!duration) duration = Math.random()*2;
  while(duration>0){
    duration -= time.deltaTime;//countdown
    yield;
  }
}
