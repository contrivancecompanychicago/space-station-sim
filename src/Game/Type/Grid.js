
import {defaults} from 'lodash';

import type {GridType} from 'Game/Data/Grid'

export default class Grid{
  type: GridType;
  rotation: number;
  constructor(params:{type:GridType, rotation:number}){
    defaults(this, params);
    if(!this.rotation)this.rotation = 0;
  }
}
