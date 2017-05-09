// @flow
/*
Objects are permanent(ish) fixtures attached to blocks
*/
import Weight from 'Game/Data/Grid/Weight'

import DataMap from 'Game/Data/Map'
import type {AbilityType} from 'Game/Data/Object/Ability'

import {keys} from 'lodash';

import Bed from './Object/Bed';
import Dock from './Object/Dock';
import Drawers from './Object/Drawers';
import Test from './Object/Test';
import Spawn from './Object/Spawn';
import Oven from './Object/Oven';
import Fridge from './Object/Fridge';
import Table from './Object/Table';
import Table2 from './Object/Table2';
import Table3 from './Object/Table3';
import Table4 from './Object/Table4';
import Table5 from './Object/Table5';
import Chair from './Object/Chair';
import Chair2 from './Object/Chair2';
import CashRegister from './Object/CashRegister';
import CashReg from './Object/CashReg';
import StoneOven from './Object/StoneOven'
import FridgeTall from './Object/FridgeTall'
import TableTall from './Object/TableTall'
import TableRound from './Object/TableRound'
import ChairTall from './Object/ChairTall'
import FoodTruck from './Object/FoodTruck'
import CoffeeMachine from './Object/CoffeeMachine'
import ChairImageset from './Object/ChairImageset'
import MetalOven from './Object/MetalOven'

export type ObjectType = string
// 'BED'|
// 'DOCK'|
// 'DRAWERS'|
// 'TEST'|
// 'OVEN'|
// 'FRIDGE'|
// 'TABLE'|
// 'TABLE2'|
// 'TABLE3'|
// 'TABLE4'|
// 'TABLE5'|
// 'CHAIR'|
// 'CHAIR2'|
// 'CASHREGISTER'|
// 'FRIDGETALL'|
// 'TABLETALL'|
// 'CHAIRTALL'|
// 'STONEOVEN'|
// 'FOODTRUCK'

export type ObjectBlocksType = 'ACCESS'|'BLOCK'
export const ObjectBlocks:{[id:ObjectBlocksType]: ObjectBlocksType} = {
  'ACCESS':'ACCESS',
  'BLOCK':'BLOCK',
}

export type rotationType = 'IMAGESET'|'ROTATE';

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
  abilities: Array<AbilityType>,
  depth?: number, //number of pixels to push stuff up to look like its on top of the object
}

//:{[id:ObjectType]:ObjectDataType}
const Objs:{[id:ObjectType]:ObjectDataType} = {};

// Objs[Bed.id] = Bed;
// Objs[Dock.id] = Dock;
// Objs[Drawers.id] = Drawers;
Objs[Test.id] = Test;
Objs[Spawn.id] = Spawn;
// Objs[Oven.id] = Oven;
// Objs[Fridge.id] = Fridge;
// Objs[Table.id] = Table;
// Objs[Table2.id] = Table2;
Objs[Table3.id] = Table3;
Objs[Table4.id] = Table4;
Objs[Table5.id] = Table5;
// Objs[Chair.id] = Chair;
// Objs[Chair2.id] = Chair2;
Objs[CashRegister.id] = CashRegister;
Objs[StoneOven.id] = StoneOven;
Objs[FridgeTall.id] = FridgeTall;
// Objs[TableTall.id] = TableTall;
// Objs[ChairTall.id] = ChairTall;
// Objs[FoodTruck.id] = FoodTruck;
Objs[CoffeeMachine.id] = CoffeeMachine
Objs[TableRound.id] = TableRound
Objs[ChairImageset.id] = ChairImageset

Objs[CashReg.id] = CashReg
Objs[MetalOven.id] = MetalOven



// // export default Objs;
// function foodtruck(type:string){
//   let obj = {
//     id: 'FOODTRUCK'+type,
//     label: 'Food Truck',
//     image: require('./Grid/foodtruck/'+type+'.png'),
//     width: 1,
//     height: 1,
//     // rotation: 'IMAGESET',
//     blocks: [
//       {type: 'BLOCK', weight: Weight.BLOCK, x:0, y:0},
//     ],
//     requirements: {},
//     abilities: []
//   }
//   Objs[obj.id] = obj;
// }

// foodtruck('tr');
// foodtruck('tm');
// foodtruck('tl');
// foodtruck('mr');
// foodtruck('ml');
// foodtruck('br');
// foodtruck('bm');
// foodtruck('bl');
// foodtruck('tr2');
// foodtruck('mr2');
// foodtruck('br2');
// Objs['FOODTRUCKbm'].rotation = 'IMAGESET'

const ObjMap:DataMap<ObjectType, ObjectDataType> = new DataMap();


export let Obj:{[id:ObjectType]:ObjectType} = {};
keys(Objs).forEach((key) => {
  Obj[key]=key;
  ObjMap.put(key, Objs[key])
});

export default ObjMap