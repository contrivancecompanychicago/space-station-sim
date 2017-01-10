// @flow
import Objekt from 'Game/Type/Object'
import config from 'Game/config';
import { makeKey, parseKey } from 'Util';
// import Factory from 'Game/Factory/Object';


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

}
