//@flow

import {defaults} from 'lodash';
import type Point from 'Game/Point';
import uniqid from 'Util/uniqid';

import type {ItemType} from 'Game/Data/Item'
import ItemData from 'Game/Data/Item'

import type Obj from 'Game/Type/Object';
import type Character from 'Game/Type/Character'

import state from 'Game/state'

export default class Item{
  position:Point;
  type: ItemType;
  id: string;
  owner: Obj|Character|null
  constructor(params:{position:Point, type:ItemType}){
    defaults(this, params);
    if(!this.id) this.id = uniqid();
  }

  getData(){
    return ItemData.get(this.type)
  }
  setOwner(newOwner: Character|Obj|null){
    //remove from old owner
    let item:Item = this
    if(this.owner){
      // switch(this.owner.constructor.name){
      //   case 'Character':
      //     let char:Character = (this.owner:any);//RECAST
      //     char.removeItem(item);
      //   break;
      //
      //   case 'Obj':
      //     let obj:Obj = (this.owner:any);//RECAST
      //     obj.item = null;
      //   break;
      // }
      this.owner.removeItem(item);
    }

    if(newOwner){
      newOwner.addItem(item);
    }

    this.owner = newOwner;
  }
  getOwner(){
    return this.owner
  }
  getObject():?Obj{
    return state.object.getObjectAtBlock(this.position.block)
  }
}
