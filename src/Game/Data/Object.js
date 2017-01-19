// @flow
/*
Objects are permanent(ish) fixtures attached to blocks
*/

import type {AbilityType} from 'Game/Data/Object/Ability'

import keys from 'lodash.keys';

import Bed from './Object/Bed';
import Dock from './Object/Dock';
import Test from './Object/Test';
import Oven from './Object/Oven';
import Fridge from './Object/Fridge';
import Table from './Object/Table';
import Table2 from './Object/Table2';
import Chair from './Object/Chair';

export type ObjectType =
'BED'|
'DOCK'|
'TEST'|
'OVEN'|
'FRIDGE'|
'TABLE'|
'TABLE2'|
'CHAIR'
export type ObjectDataType = {
  id: string,
  label: string,
  image: string,
  width: number,
  height: number,
  abilities: Array<AbilityType>
}

//:{[id:ObjectType]:ObjectDataType}
const Objs = {};

Objs[Bed.id] = Bed;
Objs[Dock.id] = Dock;
Objs[Test.id] = Test;
Objs[Oven.id] = Oven;
Objs[Fridge.id] = Fridge;
Objs[Table.id] = Table;
Objs[Table2.id] = Table2;
Objs[Chair.id] = Chair;

export default Objs;

export let Obj = {};
keys(Objs).forEach((key) => {Obj[key]=key;});
