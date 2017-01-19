//@flow

import {defaults} from 'lodash';
import type Point from 'Game/Point';
import uniqid from 'Util/uniqid';

import type {ItemType} from 'Game/Data/Item'

export default class Item{
  position:Point;
  type: ItemType;
  id: string;
  constructor(params:{position:Point, type:ItemType}){
    defaults(this, params);
    if(!this.id) this.id = uniqid();
  }
}
