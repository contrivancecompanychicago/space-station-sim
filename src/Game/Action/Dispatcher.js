
import {Modes} from 'Game/Type/Mode';
import CharacterFactory from 'Game/Factory/Character';
import TaskFactory from 'Game/Factory/Task';
import {pointToBlock, blockToPoint} from 'Util';

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
        console.info('item mode not implemented');
        break;
      case Modes.CHAR:
        let charManager = this.getComponent('characterManager');

        for(let y = sel.t; y <= sel.b; y++){
          for(let x = sel.l; x <= sel.r; x++){
            let pos = blockToPoint({x:x, y:y});
            charManager.addChar(CharacterFactory.create(pos));
          }
        }
        break;
      case Modes.TASK:
        // let pos = {x: selection.end.x, y: selection.end.y};
        // pos = pointToBlock(pos);
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
