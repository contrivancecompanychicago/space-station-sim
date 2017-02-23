//@flow
import engine from 'Game/engine'

import type Obj from 'Game/Type/Object'
// import type ObjectManager from 'Game/Manager/Object'

import state from 'Game/state'

export default function* findObjects(filter:(obj:Obj)=>boolean):Generator<*,Array<Obj>,*>{
  let objectManager = state.object
  let obj:Obj
  
  while(!obj){
    yield;
    let objs = objectManager.getObjects().filter(filter);
    if(objs.length>0) return objs
  }
  return obj;

}
