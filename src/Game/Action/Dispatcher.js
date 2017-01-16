// @flow
import {Modes} from 'Game/Data/Mode';
import {pointToBlock, blockToPoint} from 'Util';
import {Block} from 'Game/Point';
import Character from 'Game/Type/Character';
import Item from 'Game/Type/Item';
import Point from 'Game/Point';
import Objekt from 'Game/Type/Object';
import Task from 'Game/Type/Task';

import {Tasks} from 'Game/Data/Task';
import Component from 'Imagine/Component';

import type GridManager from 'Game/Manager/Grid';
import type ObjectManager from 'Game/Manager/Object';
import type ItemManager from 'Game/Manager/Item';
import type CharManager from 'Game/Manager/Character';
import type TaskManager from 'Game/Manager/Task';

export default class Dispatcher extends Component{
  state:Object;
  constructor(state:Object){
    super();
    this.type = 'actionDispatcher';
    this.state = state;
  }
  userAction(selection:Object){
    // console.log("something happened");
    let sel = selection.rect.blockRect();
    switch(this.state.UI.mode){
      case Modes.SELECT:

        console.info('select mode not implemented');
        break;
      case Modes.GRID:
        let gridManager:GridManager = (this.getComponent('gridManager'):any);
        gridManager.addNodes(selection, this.state.UI.grid);
        break;
      case Modes.OBJECT:
        let objectManager:ObjectManager = (this.getComponent('objectManager'):any);
        let obj = new Objekt({block:selection.end.block, type:this.state.UI.object});
        objectManager.addObject(obj);
        break;
      case Modes.ITEM:
        let itemManager:ItemManager = (this.getComponent('itemManager'):any);
        // let item = ItemFactory.create({
        let item = new Item({
          position: new Point({x: selection.end.x, y: selection.end.y}),
          type:this.state.UI.item});

        itemManager.addItem(item);
        break;
      case Modes.CHAR:
        let charManager:CharManager = (this.getComponent('characterManager'):any);
        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
            // let pos = blockToPoint({x:x, y:y});
            let pos = new Block({x:x, y:y}).center;
            charManager.addChar(new Character({position: pos}));
          }
        }
        break;
      case Modes.TASK:
        let taskManager:TaskManager = (this.getComponent('taskManager'):any);
        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
            let pos = {x:x, y:y};
            let task = new Task({block:pos, grid:this.state.UI.grid, type: Tasks.BUILD})
            // taskManager.addTask(TaskFactory.create({block:pos, grid:this.state.UI.grid, type: Tasks.BUILD}));
            taskManager.addTask(task)
          }
        }
        break;
    }
  }
}
