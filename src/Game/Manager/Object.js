// @flow
import Objekt from 'Game/Type/Object'
import config from 'Game/config';
import { makeKey, parseKey } from 'Util';
// import Factory from 'Game/Factory/Object';
import {values} from 'lodash'

import type {AbilityType} from 'Game/Data/Object/Ability'

import ObjectData from 'Game/Data/Object'

export default class ObjectManager{
  type:string;
  state:Object;
  constructor(state:Object = {}){
    this.type = 'objectManager';
    this.state = state;
  }
  addObject(obj:Objekt){
    //todo: check overlaps
    //todo: valid/verify/factory
    // obj = Factory.create(obj);
    this.state[makeKey(obj.block.x,obj.block.y)] = obj;

  }
  getObjectsOfType(type:string):Array<Objekt>{
    return values(this.state).filter((o)=>{return o.type===type})
  }
  getObjectsWithAbility(ability:AbilityType):Array<Objekt>{
    return values(this.state).filter((o)=>{
      let type = ObjectData[o.type]
      if(type.abilities.indexOf(ability) > -1) return true
    })
  }

}
