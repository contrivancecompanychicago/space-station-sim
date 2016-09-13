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

// import state from 'Game/state';
import {Modes} from 'Game/Type/Mode';
let proposal = {};
export default class Proposer{
  propose(state){
    proposal = {};
    // console.log(state);
    switch(state.UI.mode){
      case Modes.GRID:
        proposal.Grid = {};
        state.View.selection.rect.blocks.forEach((block) => {
          // console.log(block);
          let key = makeKey(block.x, block.y);
          if(state.Grid&&state.Grid[key]&&state.Grid[key]===state.UI.grid){}else{
            proposal.Grid[key] = state.UI.grid;
          }
        });
      break;
    }

    return proposal;
  }
}
