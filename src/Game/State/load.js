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
  let data:{grid:Object, object:Object, character:Object, item:Object} = JSON.parse(save);
  
  


  let parseKey = require('Util/parseKey').default;
  let Block = require('Game/Block').default;

  

  let grid = data.grid
  let object = data.object;

  state.item.clear();
  state.character.clear();
  state.object.clear();
  state.grid.clear();
  state.order.clear();
  state.player.clear();
  state.task.clear();
  state.time.clear();

  state.grid.load(grid)
  state.object.load(object)
  state.item.load(data.item);
  state.character.load(data.character)

}
