
import {Modes} from 'Game/Type/Mode';
import CharacterFactory from 'Game/Factory/Character';
import ItemFactory from 'Game/Factory/Item';
import TaskFactory from 'Game/Factory/Task';
import {pointToBlock, blockToPoint} from 'Util';
import {Block} from 'Game/Point';

import {Tasks} from 'Game/Type/Task';

export default class Dispatcher{
  constructor(state){
    this.type = 'actionDispatcher';
    this.state = state;
  }
  userAction(selection){
    // console.log("something happened");
    let sel = selection.rect.blockRect();
    switch(this.state.UI.mode){
      case Modes.SELECT:

        console.info('select mode not implemented');
        break;
      case Modes.GRID:
        let gridManager = this.getComponent('gridManager');
        gridManager.addNodes(selection, this.state.UI.grid);
        break;
      case Modes.ITEM:
        let itemManager = this.getComponent('itemManager');
        let item = ItemFactory.create({
          position: {x: selection.end.x, y: selection.end.y},
          type:this.state.UI.item});
        itemManager.addItem(item);
        break;
      case Modes.CHAR:
        let charManager = this.getComponent('characterManager');
        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
            // let pos = blockToPoint({x:x, y:y});
            let pos = new Block({x:x, y:y}).center;
            charManager.addChar(CharacterFactory.create({position: pos}));
          }
        }
        break;
      case Modes.TASK:
        let taskManager = this.getComponent('taskManager');
        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
            let pos = {x:x, y:y};
            taskManager.addTask(TaskFactory.create({block:pos, grid:this.state.UI.grid, type: Tasks.BUILD}));
          }
        }
        break;
    }
  }
}
