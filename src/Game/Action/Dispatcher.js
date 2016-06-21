
import {Modes} from 'Game/Type/Mode';
import CharacterFactory from 'Game/Factory/Character';


export default class Dispatcher{
  constructor(state){
    this.type = 'actionDispatcher';
    this.state = state;
  }
  userAction(selection){
    // console.log("something happened");

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
        charManager.addChar(CharacterFactory.create({x: selection.end.x, y: selection.end.y}));
        break;
    }
  }
}
