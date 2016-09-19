import config from 'Game/config';
import { makeKey, parseKey } from 'Util';

export default class ObjectManager{
  constructor(state = {}){
    this.type = 'objectManager';
    this.state = state;
  }
  addObject(obj){
    //todo: check overlaps
    //todo: valid/verify/factory
    this.state[makeKey(obj.block.x,obj.block.y)] = obj;

  }

}
