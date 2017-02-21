// @flow

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

export {GridModel, ObjectModel}

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
  // inited:boolean

  constructor(){  

    this.character = new CharacterModel()
    this.grid = new GridModel()
    this.item = new ItemModel()
    this.log = new LogModel()
    this.object = new ObjectModel()
    this.order = new OrderModel()
    this.player = new PlayerModel()
    this.task = new TaskModel()
    this.time = new TimeModel()
    this.tutorial = new TutorialModel()
    this.ui = new UIModel()
    this.view = new ViewModel()


    // this.character = new require('Game/Model/Character').default()
    // this.grid = new require('Game/Model/Grid').default()
    // this.item = new require('Game/Model/Item').default()
    // this.log = new require('Game/Model/Log').default()
    // this.object = new require('Game/Model/Object').default()
    // this.order = new require('Game/Model/Order').default()
    // this.player = new require('Game/Model/Player').default()
    // this.task = new require('Game/Model/Task').default()
    // this.time = new require('Game/Model/Time').default()
    // this.tutorial = new require('Game/Model/Tutorial').default()
    // this.ui = new require('Game/Model/Ui').default()
    // this.view = new require('Game/Model/View').default()

  }

  init(){
    // state = new State({});
    this.ui.init();
    this.view.init();
    // this.inited = true;
  }
}


export default new State();
