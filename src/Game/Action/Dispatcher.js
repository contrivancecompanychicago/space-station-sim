// @flow
import {extend, keys} from 'lodash'
import * as engine from 'Game/engine'

import {Mode} from 'Game/Data/Mode';
import {makeKey, parseKey} from 'Util';
import {Block} from 'Game/Point';
import Character from 'Game/Type/Character';
import Item from 'Game/Type/Item';
import Point from 'Game/Point';
import Objekt from 'Game/Type/Object';
import Task from 'Game/Type/Task';
import Grid from 'Game/Type/Grid';

import {Tasks} from 'Game/Data/Task';

import type {Selection} from 'Game/Type/Selection'
import ObjectData from 'Game/Data/Object'

import type {ObjectState} from 'Game/Model/Object'

import state from 'Game/state'

import Proposer from 'Game/Action/Proposer';

const proposer = new Proposer();

class Dispatcher{

  userAction(selection:Selection){

    let gridManager = state.grid; //engine.getGridManager();
    let objectManager = state.object; //engine.getObjectManager();
    let charManager = state.character; //engine.getCharacterManager();

    let sel = selection.rect.blockRect();


    switch(state.ui.state.mode){
      case Mode.SELECT:

        // console.info('select mode not implemented');
        let viewManager = state.view //engine.getViewManager();
        let uiManager = state.ui //engine.getUIManager()
        let mouse = viewManager.getMousePoint();
        let char = charManager.getClosestCharacterToPoint(mouse, 32)
        if(char){
          uiManager.setSelected(char);
        }else{
          let obj = objectManager.getObjectAtBlock(mouse.block);
          if(obj){
            uiManager.setSelected(obj);
          }
        }
        // console.log(selection.button);
        
        if(selection.button === 2){
          uiManager.clearSelected();
        }

        break;
      case Mode.GRID:
        // let gridManager:GridManager = (this.getComponent('gridManager'):any);
        gridManager.addNodes(selection, new Grid({type:state.ui.state.grid, rotation:state.ui.state.rotation}));
        break;
      case Mode.OBJECT:
        // let obj = new Objekt({block:selection.end.block, type:state.UI.object});
        // objectManager.addObject(obj);
        
        if(selection.button === 2){
          //DELETE MODE
          let obj = objectManager.getObjectAtBlock(selection.end.block);
          if(obj){
            objectManager.deleteObject(obj)
          }
        }else{
          let proposal = proposer.propose(state);
          state.object.mergeState(proposal.object.state)
        }


        break;
      case Mode.ITEM:
        let itemManager = state.item
        // let item = ItemFactory.create({
        let item = new Item({
          position: new Point({x: selection.end.x, y: selection.end.y}),
          type:state.ui.state.item});

        itemManager.addItem(item);
        break;
      case Mode.CHAR:

        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
            let pos = new Block({x:x, y:y}).center;
            charManager.addChar(new Character({position: pos, type: state.ui.state.character}));
          }
        }
        break;
      case Mode.TASK:
        let taskManager = state.task
        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
          let pos = new Block({x:x, y:y});
            let task = new Task({block:pos, grid:state.ui.state.grid, type: Tasks.BUILD})
            // taskManager.addTask(TaskFactory.create({block:pos, grid:state.UI.grid, type: Tasks.BUILD}));
            taskManager.addTask(task)
          }
        }
        break;
    }
  }
}

export default new Dispatcher();