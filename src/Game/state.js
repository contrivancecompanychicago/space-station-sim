// @flow

import CharacterModel from 'Game/Model/Character';
import GridModel from 'Game/Model/Grid';
import ItemModel from 'Game/Model/Item';
import LogModel from 'Game/Model/Log';
import ObjectModel from 'Game/Model/Object';
import OrderModel from 'Game/Model/Order';
import PlayerModel from 'Game/Model/Player';
import TaskModel from 'Game/Model/Task';
import TimeModel from 'Game/Model/Time';
import TutorialModel from 'Game/Model/Tutorial';
import UIModel from 'Game/Model/UI';
import ViewModel from 'Game/Model/View';

import clear from 'Game/State/clear'
import load from 'Game/State/load';

export class State {
  character: CharacterModel
  grid: GridModel
  item: ItemModel
  log: LogModel
  object: ObjectModel
  order: OrderModel
  player: PlayerModel
  task: TaskModel
  time: TimeModel
  // tutorial: TutorialModel
  ui: UIModel
  view: ViewModel

  constructor() {
  }
  clear(){
    clear();
  }
  load(savename:string){
    load(savename);
  }

  init() {
    this.character = new CharacterModel();
    this.grid = new GridModel();
    this.item = new ItemModel();
    this.log = new LogModel();
    this.object = new ObjectModel();
    this.order = new OrderModel();
    this.player = new PlayerModel();
    this.task = new TaskModel();
    this.time = new TimeModel();
    // this.tutorial = new TutorialModel();
    this.ui = new UIModel();
    this.view = new ViewModel();

  }
}


export default new State();
