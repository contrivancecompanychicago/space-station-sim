//@flow
import backupdata from './demo3'

import Grid from 'Game/Type/Grid'
import Obj from 'Game/Type/Object'
import Character from 'Game/Type/Character'
import {keys} from 'lodash'

import engine from 'Game/engine';

import config from 'Game/config'
import state from 'Game/state'

import dispatcher from 'Game/Action/Dispatcher'

export default function loadGame(savename:string){

  let data = backupdata;
  if(savename){
    data = JSON.parse(localStorage[config.save.prefix+savename])
  }
  


  let parseKey = require('Util/parseKey').default;
  let Block = require('Game/Block').default;

  

  let grid = data.grid
  let object = data.object;

  state.character.clear();
  state.object.clear();
  state.grid.clear();

  state.grid.load(grid)
  state.object.load(object)
  state.character.load(data.character)

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
