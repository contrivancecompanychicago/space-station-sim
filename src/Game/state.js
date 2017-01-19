// @flow
//"Global"

import keys from 'lodash.keys';

import Point from 'Game/Point';

import type Task from 'Game/Type/Task'
import type Character from 'Game/Type/Character';
import type Item from 'Game/Type/Item'
import type Grid from 'Game/Type/Grid'

import {Mode} from 'Game/Data/Mode';
// type ModesType = 'SELECT'
// | 'GRID'
// | 'ITEM'
// | 'CHAR'
// | 'TASK'
// | 'OBJECT';
// type ModesType = $Keys<typeof Modes>

export type CharacterState = {
  [id:string]: Character
}

export type GridState = {
  [id:string]: Grid
}

export type ItemState = {
  [id:string]: Item
}

export type ObjectState = {
  [id:string]: Object
}

export type TaskState = {
  [id:string]: Task
}

export type UIState = {
  mode:any,
  rotation: number
}

export type ViewState = {
  offset: {x:number, y:number},
  mousePosition: {x:number, y:number},
  scale: number,
  selection: Object|boolean
}

export type TimeState = {
  currentTime: number
}

export type State = {
  Character: CharacterState,
  Grid: GridState,
  Item: ItemState,
  "Object": ObjectState,
  Task: TaskState,
  UI: UIState,
  View: ViewState,
  Time: TimeState
}

const state:State = base();
export default state;
export function clear(){
  keys(state).forEach((key) => {
    delete state[key];
  });
}

export function base():State{
  return {
    Time: {currentTime:0},
    Character:{},
    Grid:{},
    Item:{},
    "Object":{},
    Task:{},
    UI:{
      mode: Mode.SELECT,
      rotation: 0
    },
    View:{
      offset: {x:0, y:0},
      mousePosition: {x:0, y:0},
      scale:1,
      selection:false
    },
  };
}
