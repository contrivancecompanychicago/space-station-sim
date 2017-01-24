// @flow

import type Point from 'Game/Point';
import {defaults} from 'lodash';
import uniqid from 'Util/uniqid';

import type {CharacterType} from 'Game/Data/Character'
import type Item from 'Game/Type/Item'

export default class Character{
  id: string;
  type:CharacterType;
  position: Point;
  firstname: string;
  lastname: string;
  action: ?Object;
  item: Array<Item>;
  task: string;
  constructor(params:{type:CharacterType, position:Point}){
    defaults(this, params);
    if(!this.id) this.id = uniqid();
    if(!this.item) this.item = []
  }
  addItem(item:Item){
    this.item.push(item)
  }
  hasItem(item:Item):boolean{
    return this.item.indexOf(item) >-1
  }
  removeItem(item:Item){
    this.item.splice(this.item.indexOf(item), 1);
  }
}
