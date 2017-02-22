//@flow
import {defaults} from 'lodash';

import state from 'Game/state'

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
    if(this.object){
      return state.object.getObject(this.object)
    }
  }
  setObject(obj:Obj){
    this.object = obj.getKey();
  }
}
