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

import * as engine from 'Game/engine'

import Manager from 'Game/Manager'

export default class ObjectManager extends Manager{
  type:string;
  state:ObjectState;
  constructor(state:ObjectState = {}){
    super()
    this.type = 'objectManager';
    this.state = state;
  }
  addObject(obj:Obj){
    //todo: check overlaps
    //todo: valid/verify/factory
    // obj = Factory.create(obj);
    this.state[obj.getKey()] = obj;

  }
  deleteObject(obj:Obj){
    delete this.state[obj.getKey()];
  }
  getObject(key:string){
    return this.state[key]
  }
  getObjectAtBlock(block:Block):?Obj{
    if(this.state[block.key])
      return this.state[block.key];

    //check overlapping
    let grid = engine.getGridManager().getNode(block.x, block.y)
    if(grid){
      if(grid.object){
        return this.state[grid.object];
      }
    }

  }
  getObjects():Array<Obj>{
    return values(this.state);
  }
  getObjectsOfType(type:string):Array<Obj>{
    return values(this.state).filter((o)=>{return o.type===type})
  }
  getObjectsWithAbility(ability:AbilityType):Array<Obj>{
    return values(this.state).filter((o)=>{
      let type = ObjectData.get(o.type)
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
