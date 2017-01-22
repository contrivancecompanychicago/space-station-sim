//@flow
import {defaults} from 'lodash';

import type {GridType, GridDataType} from 'Game/Data/Grid'
// import type {ObjectType, ObjectDataType} from 'Game/Data/Object'

import GridData from 'Game/Data/Grid';

export default class Grid{
  type: GridType;
  rotation: number;
  constructor(params:{type:GridType, rotation:number}){
    defaults(this, params);
    if(!this.rotation)this.rotation = 0;
  }
  getData():GridDataType{
    return GridData[this.type]
  }
}
