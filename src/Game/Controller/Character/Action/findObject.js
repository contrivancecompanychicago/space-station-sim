//@flow
import engine from 'Game/engine'

import type Obj from 'Game/Type/Object'

import state from 'Game/state'

export default function* findObject(filter:Function):Generator<*,Obj,*>{
  let obj:Obj
  
  while(!obj){
    yield;
    let objs = state.object.getObjects().filter(filter);
    if(objs.length>0) obj = objs[0];
  }
  return obj;

}
