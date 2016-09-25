/*
ACTION PROPOSER
this comes up with a proposal
based on ui and selection

output used for:
 - rendering preview
 - checking resources
 - implementing in dispatcher

inputs:
 - selection
 - ui state

output:
 - delta state
 - resource cost

processing:
 - remove duplicates

*/
import { makeKey, parseKey } from 'Util';
import {base} from 'Game/state';

// import state from 'Game/state';
import {Modes} from 'Game/Type/Mode';
let proposal = {};
export default class Proposer{
  propose(state){
    proposal = base();
    // console.log(state);

    switch(state.UI.mode){
      case Modes.GRID:
        proposal.Grid = {};
        state.View.selection.rect.blocks.forEach((block) => {
          let key = makeKey(block.x, block.y);
          if(state.Grid&&state.Grid[key]&&state.Grid[key]===state.UI.grid){}else{ //if not already there

            proposal.Grid[key] = state.UI.grid;

          }
        });
      break;
      case Modes.OBJECT:
        proposal.Object = {};
        state.View.selection.rect.blocks.forEach((block) => {
          let key = makeKey(block.x, block.y);
          proposal.Object[key] = {type:state.UI.object};
        });
      break;
      case Modes.ITEM:
      break;
    }

    return proposal;
  }
}

/*
  see if a block already has an object in it ( for determining where to place objects)
 @returns boolean
*/
function blockHasObject(block){

}
