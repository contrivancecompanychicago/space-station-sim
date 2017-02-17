//@flow
import {defaults} from 'lodash';

import * as engine from 'Game/engine'


import type {GridType, GridDataType} from 'Game/Data/Grid'
// import type {ObjectType, ObjectDataType} from 'Game/Data/Object'

import GridData from 'Game/Data/Grid';

import type Obj from 'Game/Type/Object'


export default class Grid{
  type: GridType;
  rotation: number;
  object: ?string
  constructor(params:{type:GridType, rotation:number}){
    defaults(this, params);
    if(!this.rotation)this.rotation = 0;
  }
  getData():GridDataType{
    return GridData.get(this.type)
  }
  getObject():?Obj{
    // console.log(typeof this.object)
    if(this.object){
      // FLOWHACK
      return engine.getObjectManager().getObject(this.object)
    }
  }
}
