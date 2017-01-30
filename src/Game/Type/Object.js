//@flow

import {defaults} from 'lodash';
// import type Point from 'Game/Point';
import type Block from 'Game/Block'
import ObjectData from 'Game/Data/Object'

import type {ObjectType, ObjectDataType, ObjectBlocksDataType} from 'Game/Data/Object'

import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'

import type {AbilityType} from 'Game/Data/Object/Ability'
import Ability from 'Game/Data/Object/Ability'



export default class Obj{
  block: Block;
  type: ObjectType;
  character: ?Character
  item: ?Item
  rotation: number
  constructor(params:{block:Block, type:ObjectType}){
    defaults(this, params);
    if(!this.rotation) this.rotation = 0;
  }
  getData():ObjectDataType{
    return ObjectData[this.type]
  }
  hasAbility(ability:AbilityType):boolean{
    return (this.getData().abilities.indexOf(ability) > -1)
  }
  getBlocks():Array<ObjectBlocksDataType>{
    // console.log(this.rotation);

    return this.getData().blocks.map((b) => {
      switch(this.rotation){
        case 1:
          return {x:-b.y, y:b.x}
        case 2:
          return {x:-b.x, y:-b.y}
        case 3:
          return {x:b.y, y:-b.x}
        default:
          return b;
      }
    })
  }
}
