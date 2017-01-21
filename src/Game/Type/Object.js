//@flow

import {defaults} from 'lodash';
// import type Point from 'Game/Point';
import type Block from 'Game/Block'
import ObjectData from 'Game/Data/Object'

import type {ObjectType, ObjectDataType} from 'Game/Data/Object'

import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'

export default class Obj{
  block: Block;
  type: ObjectType;
  character: ?Character
  item: ?Item
  constructor(params:{block:Block, type:ObjectType}){
    defaults(this, params);
  }
  getData():ObjectDataType{
    return ObjectData[this.type]
  }
}
