// @flow
import Obj from 'Game/Type/Object'
import config from 'Game/config';
import { makeKey, parseKey } from 'Util';
// import Factory from 'Game/Factory/Object';
import {values} from 'lodash'

import type {AbilityType} from 'Game/Data/Object/Ability'

import ObjectData from 'Game/Data/Object'

import type {ObjectState} from 'Game/state'
import type {ItemType} from 'Game/Data/Item'
import type Block from 'Game/Block'

export default class ObjectManager{
  type:string;
  state:ObjectState;
  constructor(state:ObjectState = {}){
    this.type = 'objectManager';
    this.state = state;
  }
  addObject(obj:Obj){
    //todo: check overlaps
    //todo: valid/verify/factory
    // obj = Factory.create(obj);
    this.state[makeKey(obj.block.x,obj.block.y)] = obj;

  }
  deleteObject(obj:Obj){
    delete this.state[makeKey(obj.block.x,obj.block.y)];
  }
  getObjectAtBlock(block:Block):?Obj{
    return this.state[block.key];
  }
  getObjects():Array<Obj>{
    return values(this.state);
  }
  getObjectsOfType(type:string):Array<Obj>{
    return values(this.state).filter((o)=>{return o.type===type})
  }
  getObjectsWithAbility(ability:AbilityType):Array<Obj>{
    return values(this.state).filter((o)=>{
      let type = ObjectData[o.type]
      if(type.abilities.indexOf(ability) > -1) return true
    })
  }

  getObjectsWithItemType(type:ItemType):Array<Obj>{
    return values(this.state).filter((o)=>{
      if(o.item){
        if(o.item.type === type) return true
      }
    })
  }

}
