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
  rotateBlock(b:ObjectBlocksDataType):ObjectBlocksDataType{
    switch(this.rotation){
      case 1:
      return {type: b.type, x:-b.y, y:b.x}
      case 2:
      return {type: b.type, x:-b.x, y:-b.y}
      case 3:
      return {type: b.type, x:b.y, y:-b.x}
      default:
      return b;
    }

  }
  getBlocks():Array<ObjectBlocksDataType>{
    // console.log(this.rotation);
    return this.getData().blocks.map((b) => {
      return this.rotateBlock(b);
    })
  }
  getAccessBlock():Block{
    let accessBlocks = this.getBlocks().filter((b) => {
      return b.type == 'ACCESS';
    })
    let ab = accessBlocks[Math.floor(Math.random()*accessBlocks.length)]
    if(ab){
      return this.block.add(ab);
    }else{
      return this.block
    }
  }

  addItem(item:Item){
    this.item = (item)
  }
  removeItem(item:Item){
    if(this.item === item)
      this.item = null
  }
}
