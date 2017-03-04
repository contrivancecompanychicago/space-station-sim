//@flow

import {defaults} from 'lodash';
import Ability from 'Game/Data/Object/Ability'
import makeKey from 'Util/makeKey'
import ObjectData from 'Game/Data/Object'
import state from 'Game/state'
import type {AbilityType} from 'Game/Data/Object/Ability'
import type {ObjectType, ObjectDataType, ObjectBlocksDataType} from 'Game/Data/Object'
import type Block from 'Game/Block'
import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'

export default class Obj{
  block: Block;
  type: ObjectType;
  rotation: number
  constructor(params:{block:Block, type:ObjectType}){
    defaults(this, params);
    if(!this.rotation) this.rotation = 0;
  }
  getKey():string{
    return makeKey(this.block.x,this.block.y)
  }
  getData():ObjectDataType{
    return ObjectData.get(this.type)
  }
  hasAbility(ability:AbilityType):boolean{
    return (this.getData().abilities.indexOf(ability) > -1)
  }
  rotateBlock(b:ObjectBlocksDataType):ObjectBlocksDataType{
    switch(this.rotation){
      case 1:
      return {type: b.type, weight: b.weight, x:-b.y, y:b.x}
      case 2:
      return {type: b.type, weight: b.weight, x:-b.x, y:-b.y}
      case 3:
      return {type: b.type, weight: b.weight, x:b.y, y:-b.x}
      default:
      return b;
    }

  }
  getBlocks():Array<ObjectBlocksDataType>{
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
  getAccessBlocks():Array<Block>{
    return this.getBlocks().filter((b) => {
      return b.type == 'ACCESS';
    }).map(b => {
      return this.block.add(b);
    })
  }
  
  character: ?string
  
  setCharacter(char:Character){
    this.character = char.id
  }
  getCharacter():?Character{
    if(this.character)
      return state.character.getChar(this.character);
  }
  removeCharacter(){
    this.character = null
  }

  item: ?string
  addItem(item:Item){
    this.item = item.id
  }
  removeItem(item:?Item){
    this.item = null
  }
}
