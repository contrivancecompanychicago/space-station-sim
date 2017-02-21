//@flow


import Grid from 'Game/Type/Grid'
import Obj from 'Game/Type/Object'
import Character from 'Game/Type/Character'
import {keys} from 'lodash'

import engine from 'Game/engine';

import config from 'Game/config'
import state from 'Game/state'

import dispatcher from 'Game/Action/Dispatcher'

export default function loadGame(savename:string){

  let data = JSON.parse(localStorage[config.save.prefix+savename])
  
  


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

}
