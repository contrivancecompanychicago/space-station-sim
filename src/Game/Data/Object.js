// @flow
/*
Objects are permanent(ish) fixtures attached to blocks
*/

import DataMap from 'Game/Data/Map'
import type {AbilityType} from 'Game/Data/Object/Ability'

import {keys} from 'lodash';

import Bed from './Object/Bed';
import Dock from './Object/Dock';
import Drawers from './Object/Drawers';
import Test from './Object/Test';
import Oven from './Object/Oven';
import Fridge from './Object/Fridge';
import Table from './Object/Table';
import Table2 from './Object/Table2';
import Table3 from './Object/Table3';
import Table4 from './Object/Table4';
import Table5 from './Object/Table5';
import Chair from './Object/Chair';
import Chair2 from './Object/Chair2';

export type ObjectType =
'BED'|
'DOCK'|
'DRAWERS'|
'TEST'|
'OVEN'|
'FRIDGE'|
'TABLE'|
'TABLE2'|
'TABLE3'|
'TABLE4'|
'TABLE5'|
'CHAIR'|
'CHAIR2'

export type ObjectBlocksType = 'ACCESS'|'BLOCK'
export const ObjectBlocks:{[id:ObjectBlocksType]: ObjectBlocksType} = {
  'ACCESS':'ACCESS',
  'BLOCK':'BLOCK',
}

export type ObjectBlocksDataType = {
  x:number, y:number, type: ObjectBlocksType, weight:number
}
export type ObjectDataType = {
  id: ObjectType,
  label: string,
  image: any,  //TODO type better
  width: number,
  height: number,
  blocks: Array<ObjectBlocksDataType>,
  abilities: Array<AbilityType>
}

//:{[id:ObjectType]:ObjectDataType}
const Objs:{[id:ObjectType]:ObjectDataType} = {};

// Objs[Bed.id] = Bed;
// Objs[Dock.id] = Dock;
Objs[Drawers.id] = Drawers;
Objs[Test.id] = Test;
Objs[Oven.id] = Oven;
Objs[Fridge.id] = Fridge;
// Objs[Table.id] = Table;
// Objs[Table2.id] = Table2;
Objs[Table3.id] = Table3;
Objs[Table4.id] = Table4;
Objs[Table5.id] = Table5;
// Objs[Chair.id] = Chair;
Objs[Chair2.id] = Chair2;

// export default Objs;

const ObjMap:DataMap<ObjectType, ObjectDataType> = new DataMap();


export let Obj:{[id:ObjectType]:ObjectType} = {};
keys(Objs).forEach((key) => {
  Obj[key]=key;
  ObjMap.put(key, Objs[key])
});

export default ObjMap