// // @flow
// //"Global"

// import {keys} from 'lodash';

// import Point from 'Game/Point';

// import type Task from 'Game/Type/Task'
// import type Character from 'Game/Type/Character';
// import type Item from 'Game/Type/Item'
// import type Grid from 'Game/Type/Grid'
// import type Obj from 'Game/Type/Object'
// import type {Selection} from 'Game/Type/Selection'
// import type Order from 'Game/Type/Order'

// import type {TalentType} from 'Game/Data/Talent'

// // import {Grid} from 'Game/Data/Grid';

// import {Mode} from 'Game/Data/Mode';
// // type ModesType = 'SELECT'
// // | 'GRID'
// // | 'ITEM'
// // | 'CHAR'
// // | 'TASK'
// // | 'OBJECT';
// // type ModesType = $Keys<typeof Modes>

// export type OrderState = Array<Order>;

// export type CharacterState = {
//   [id:string]: Character
// }

// export type GridState = {
//   [id:string]: Grid
// }

// export type ItemState = {
//   [id:string]: Item
// }

// export type ObjectState = {
//   [id:string]: Obj
// }

// export type TaskState = {
//   [id:string]: Task
// }
// export type TutorialState = {
  
// }

// export type UIState = {
//   mode:any,
//   rotation: number,
//   selected: Array<Obj | Character | null>,
//   panel: Object
//   // grid:Grid
// }

// export type ViewState = {
//   offset: {x:number, y:number},
//   mousePosition: {x:number, y:number},
//   scale: number,
//   selection: ?Selection,
// }

// export type TimeState = {
//   currentTime: number
// }

// export type PlayerState = {
//   money: number
// }

// export type TalentState = {
//   [id:TalentType]:boolean
// }

// export type State = {
//   Character: CharacterState,
//   Grid: GridState,
//   Item: ItemState,
//   "Object": ObjectState,
//   Task: TaskState,
//   UI: UIState,
//   View: ViewState,
//   Time: TimeState,
//   Order: OrderState,
//   Player: PlayerState,
//   Talent: TalentState
// }

// const state:State = base();
// export default state;
// export function clear(){
//   keys(state).forEach((key) => {
//     delete state[key];
//   });
// }

// export function base():State{
//   return {
//     Time: {currentTime:0},
//     Character:{},
//     Grid:{},
//     Item:{},
//     "Object":{},
//     Task:{},
//     UI:{
//       mode: Mode.SELECT,
//       rotation: 0,
//       selected: [],
//       // grid: Grid.FLOOR
//       panel: {
//         hiring:{show:false},
//         staff:{show:false},
//         orders:{show:false},
//         log:{show:false},
//         talent:{show:false},
//         save:{show:true},
//       },
//     },
//     View:{
//       offset: {x:0, y:0},
//       mousePosition: {x:0, y:0},
//       scale:1,
//       selection:null,
//       // selected:null
//     },
//     Order:[],
//     Player:{money:10000},
//     Talent: {}
//   };
// }

import CharacterModel from 'Game/Model/Character'
import GridModel from 'Game/Model/Grid';
import ItemModel from 'Game/Model/Item'
import LogModel from 'Game/Model/Log'
import ObjectModel from 'Game/Model/Object'
import OrderModel from 'Game/Model/Order'
import PlayerModel from 'Game/Model/Player'
import TaskModel from 'Game/Model/Task'
import TimeModel from 'Game/Model/Time'
import TutorialModel from 'Game/Model/Tutorial'
import UIModel from 'Game/Model/UI'
import ViewModel from 'Game/Model/View'



export class State{
  character:CharacterModel
  grid:GridModel
  item:ItemModel
  log:LogModel
  object:ObjectModel
  order:OrderModel
  player:PlayerModel
  task:TaskModel
  time:TimeModel
  tutorial:TutorialModel
  ui:UIModel
  view:ViewModel
  inited:boolean

  constructor(state:Object){
    this.inited = false;    
    this.character = new CharacterModel(state.character)
    this.grid = new GridModel(state.grid)
    this.item = new ItemModel(state.item)
    this.log = new LogModel(state.log)
    this.object = new ObjectModel(state.object)
    this.order = new OrderModel(state.order)
    this.player = new PlayerModel(state.player)
    this.task = new TaskModel(state.task)
    this.time = new TimeModel(state.time)
    this.tutorial = new TutorialModel(state.tutorial)
    this.ui = new UIModel(state.ui)
    this.view = new ViewModel(state.view)

  }

  init(){
    // state = new State({});
    this.ui.init();
    this.view.init();
    this.inited = true;
  }
}


// let state = {uninitiated:'true'};
// export default state;

// export function initState(){
//   console.log('initiating state', state)
//   state = new State({})
//   console.log('initiating state', state)
// }

export default new State({});
