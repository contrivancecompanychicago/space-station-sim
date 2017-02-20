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
// import {base} from 'Game/state';

// import state from 'Game/state';
import {Mode} from 'Game/Data/Mode';

import Grid from 'Game/Type/Grid'

import ObjectData from 'Game/Data/Object';

import type {State} from 'Game/state'
import Obj from 'Game/Type/Object'


let proposal:State;
export default class Proposer{
  propose(state:Object){
    proposal = {
      grid:{state:{}}, 
      object:{state:{}}
    };
    // console.log(state);

    if(state.view.state.selection){
      switch(state.ui.state.mode){
        case Mode.GRID:
          proposal.grid.state = {};
          state.View.selection.rect.blocks.forEach((block) => {
            let key = makeKey(block.x, block.y);
            if(state.Grid&&state.Grid[key]&&state.Grid[key]===state.UI.grid){}else{ //if not already there

              proposal.grid.state[key] = new Grid({type: state.UI.grid, rotation: state.UI.rotation});

            }
          });
        break;
        case Mode.OBJECT:
          proposal.object.state = {};
          state.View.selection.rect.blocks.forEach((block) => {
            if(!blockHasObject(proposal, block)){
              let key = makeKey(block.x, block.y);
              let obj = new Obj({type:state.UI.object, block:block, rotation: state.UI.rotation});
              proposal.object.state[key] = obj
            }
          });
        break;
        case Mode.ITEM:
        break;
      }
    }else{ //NO SELECTION
        switch(state.ui.state.mode){
          case Mode.GRID:
            proposal.grid.state = {};
            let key = state.View.mousePosition.block.key
            proposal.grid.state[key] = new Grid({type:state.UI.grid, rotation:state.UI.rotation})
          break;
          case Mode.OBJECT:
            proposal.object.state = {};
            let obj = new Obj({type:state.UI.object, rotation: state.UI.rotation, block: state.View.mousePosition.block});
            proposal.object.state[state.View.mousePosition.block.key] = obj
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
  if(state.object.state[key]) return true;
  //check neighbours
  for(let x = 0; x<3; x++){
    for(let y = 0; y<3; y++){
      key = makeKey(block.x - x, block.y - y);
      let obj = state.object.state[key];
      if(obj){
        let type = ObjectData.get(obj.type);
        if(type.width>=x+1 && type.height>=y+1)
          return true;
      }
    }
  }
}
