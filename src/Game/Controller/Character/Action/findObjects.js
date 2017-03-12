//@flow
import engine from 'Game/engine'

import type Obj from 'Game/Type/Object'

import state from 'Game/state'

export default function* findObjects(filter:(obj:Obj)=>boolean):Generator<*,Array<Obj>,*>{
  
  let objs:Array<Obj>  = []
  
  while(objs.length == 0){
    // yield;
    objs = state.object.getObjects().filter(filter);
    if(objs.length == 0) yield;
  }
  return objs
}
