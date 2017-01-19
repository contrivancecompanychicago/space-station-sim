//@flow

import {defaults} from 'lodash';
// import type Point from 'Game/Point';
import type Block from 'Game/Block'

import type {ObjectType} from 'Game/Data/Object'

export default class Obj{
  block: Block;
  type: ObjectType;
  constructor(params:{block:Block, type:ObjectType}){
    defaults(this, params);
  }
}
