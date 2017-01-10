//@flow

import {defaults} from 'lodash';
import type Point from 'Game/Point';
import uniqid from 'Util/uniqid';

export default class Item{
  position:Point;
  type: string;
  id: string;
  constructor(params:Object){
    defaults(this, params);
    if(!this.id) this.id = uniqid();
  }
}
