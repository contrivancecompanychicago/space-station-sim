//@flow
import data from './demo3'

import Grid from 'Game/Type/Grid'
import Obj from 'Game/Type/Object'
import Character from 'Game/Type/Character'
import {keys} from 'lodash'

import engine from 'Game/engine';

import config from 'Game/config'
import state from 'Game/state'

import dispatcher from 'Game/Action/Dispatcher'

export default function loadGame(savename:string){

  // let data = JSON.parse(localStorage.quicksave)

  let grid = data.Grid

  let parseKey = require('Util/parseKey').default;
  let Block = require('Game/Block').default;

  

  keys(grid).forEach((key)=>{
      let block = parseKey(key);
      state.grid.addNode(block.x, block.y, new Grid(grid[key]))
      // console.log(block);
  })

  let object = data.Object;
  keys(object).forEach((key) => {
    // let block = parseKey(key);
    let obj = object[key];

    obj.block = new Block(obj.block)
    obj.character = null; //HACK: fixing data in demo mode
    // this.manager.getComponent('objectManager').addObject(new Obj(obj));
    object[key] = new Obj(obj);
  })
  state.object.mergeState(object)

  // let chars = [
  //   {x:11, y:8, type:'COOK'},
  //   {x:18, y:8, type:'WAITER'},
  //   {x:18, y:12, type:'CUSTOMER'},
  // ]
  // data.Character.forEach((c)=> {
  //   // console.log("ding");
  //   let pos = new Block({x:c.x, y:c.y}).center;
  //   engine.getComponent('characterManager')
  //     .addChar(new Character({position: pos, type: c.type}));

  // })

}
