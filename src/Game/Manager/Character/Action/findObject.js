//@flow
import engine from 'Game/engine'

import type Obj from 'Game/Type/Object'
import type ObjectManager from 'Game/Manager/Object'

export default function* findObject(filter:Function):Generator<*,Obj,*>{
  let objectManager:ObjectManager = engine.getComponent('objectManager');
  let obj:Obj

  while(!obj){
    yield;
    let objs = objectManager.getObjects().filter(filter);
    if(objs.length>0) obj = objs[0];
  }
  return obj

}
