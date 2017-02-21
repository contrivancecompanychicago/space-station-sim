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


  let save = localStorage[config.save.prefix+savename];
  if(!save) return;
  let data:{grid:Object, object:Object, character:Object} = JSON.parse(save);
  
  


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
