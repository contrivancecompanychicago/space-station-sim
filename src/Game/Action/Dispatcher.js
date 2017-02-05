// @flow
import {extend, keys} from 'lodash'
import * as engine from 'Game/engine'

import {Mode} from 'Game/Data/Mode';
import {pointToBlock, blockToPoint, makeKey, parseKey} from 'Util';
import {Block} from 'Game/Point';
import Character from 'Game/Type/Character';
import Item from 'Game/Type/Item';
import Point from 'Game/Point';
import Objekt from 'Game/Type/Object';
import Task from 'Game/Type/Task';
import Grid from 'Game/Type/Grid';

import {Tasks} from 'Game/Data/Task';
import Component from 'Imagine/Component';

import type GridManager from 'Game/Manager/Grid';
import type ObjectManager from 'Game/Manager/Object';
import type ItemManager from 'Game/Manager/Item';
import type CharManager from 'Game/Manager/Character';
import type TaskManager from 'Game/Manager/Task';
import type {Selection} from 'Game/Type/Selection'
import ObjectData from 'Game/Data/Object'

import Proposer from 'Game/Action/Proposer';
const proposer = new Proposer();

import type {ObjectState} from 'Game/state'

export default class Dispatcher extends Component{
  state:Object;
  constructor(state:Object){
    super();
    this.type = 'actionDispatcher';
    this.state = state;
  }
  objects(objects:ObjectState){ //TODO move this to object manager
    extend(this.state.Object, objects)
    keys(objects).forEach((key) => {
      let obj = objects[key];

      let type = ObjectData[obj.type]

      let coord = parseKey(key)
      for(let x = 0; x<type.width; x++){
        for(let y = 0; y<type.height; y++){
          let gridkey = makeKey(coord.x+x, coord.y+y)
          if(this.state.Grid[gridkey])
            this.state.Grid[gridkey].object = key;
        }
      }
    })
  }

  userAction(selection:Selection){

    let gridManager = engine.getGridManager();
    let objectManager = engine.getObjectManager();

    let sel = selection.rect.blockRect();

    if(selection.button === 2){
      //DELETE MODE
      let obj = objectManager.getObjectAtBlock(selection.end.block);
      if(obj){
        objectManager.deleteObject(obj)
      }

      return;
    }

    switch(this.state.UI.mode){
      case Mode.SELECT:

        console.info('select mode not implemented');
        let viewManager = engine.getViewManager();
        // let pos = viewManager.state.mousePosition;
        // let point = Point.fromScreen(pos.x, pos.y);
        // let obj = objectManager.getObjectAtBlock(point.block);
        let obj = objectManager.getObjectAtBlock(
          viewManager.getMousePoint().block);
        console.log(obj);


        break;
      case Mode.GRID:
        // let gridManager:GridManager = (this.getComponent('gridManager'):any);
        gridManager.addNodes(selection, new Grid({type:this.state.UI.grid, rotation:this.state.UI.rotation}));
        break;
      case Mode.OBJECT:
        // let obj = new Objekt({block:selection.end.block, type:this.state.UI.object});
        // objectManager.addObject(obj);
        let proposal = proposer.propose(this.state);
        this.objects(proposal.Object)


        break;
      case Mode.ITEM:
        let itemManager:ItemManager = (this.getComponent('itemManager'):any);
        // let item = ItemFactory.create({
        let item = new Item({
          position: new Point({x: selection.end.x, y: selection.end.y}),
          type:this.state.UI.item});

        itemManager.addItem(item);
        break;
      case Mode.CHAR:
        let charManager:CharManager = (this.getComponent('characterManager'):any);
        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
            // let pos = blockToPoint({x:x, y:y});
            let pos = new Block({x:x, y:y}).center;
            charManager.addChar(new Character({position: pos, type: this.state.UI.character}));
          }
        }
        break;
      case Mode.TASK:
        let taskManager:TaskManager = (this.getComponent('taskManager'):any);
        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
          let pos = new Block({x:x, y:y});
            let task = new Task({block:pos, grid:this.state.UI.grid, type: Tasks.BUILD})
            // taskManager.addTask(TaskFactory.create({block:pos, grid:this.state.UI.grid, type: Tasks.BUILD}));
            taskManager.addTask(task)
          }
        }
        break;
    }
  }
}
