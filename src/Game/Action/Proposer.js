// @flow
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
import {Modes} from 'Game/Data/Mode';

import ObjectTypes from 'Game/Data/Object';


let proposal = {};
export default class Proposer{
  propose(state:Object){
    proposal = base();
    // console.log(state);

    if(state.View.selection){
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
            if(!blockHasObject(proposal, block)){
              let key = makeKey(block.x, block.y);
              proposal.Object[key] = {type:state.UI.object};
            }
          });
        break;
        case Modes.ITEM:
        break;
      }
    }else{ //NO SELECTION
        switch(state.UI.mode){
          case Modes.OBJECT:
            proposal.Object = {};
            proposal.Object[state.View.mousePosition.block.key] = {type:state.UI.object};
          break;
        }
    }

    return proposal;
  }
}

/*
  see if a block already has an object in it ( for determining where to place objects)
 @returns boolean
*/
function blockHasObject(state, block){
  let key = makeKey(block.x, block.y);
  if(state.Object[key]) return true;
  //check neighbours
  for(let x = 0; x<3; x++){
    for(let y = 0; y<3; y++){
      key = makeKey(block.x - x, block.y - y);
      let obj = state.Object[key];
      if(obj){
        let type = ObjectTypes[obj.type];
        if(type.width>=x+1 && type.height>=y+1)
          return true;
      }
    }
  }
}
