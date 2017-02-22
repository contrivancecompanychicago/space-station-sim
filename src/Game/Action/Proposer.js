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
import { Mode } from 'Game/Data/Mode';

import Grid from 'Game/Type/Grid'

import ObjectData from 'Game/Data/Object';

import type {State } from 'Game/state'
import Obj from 'Game/Type/Object'

// import {GridModel, ObjectModel} from 'Game/state'

// import GridModel from 'Game/Model/Grid';
// import ObjectModel from 'Game/Model/Object'

let proposal: Object;
export default class Proposer {
  propose(state: State) {
    proposal = {
      // grid: new GridModel(),
      // object: new ObjectModel(),
      grid: {state:{}},
      object: {state:{}},
      view: {}
    };
    let sel = state.view.state.selection

    if (sel) {
      switch (state.ui.state.mode) {
        case Mode.GRID:
          proposal.grid.state = {};
          sel.rect.blocks.forEach((block) => {
            let key = makeKey(block.x, block.y);
            let bl = state.grid.getNode(block.x, block.y)
            if (bl && bl.type === state.ui.state.grid) { } else { //if not already there

              proposal.grid.state[key] = new Grid({ type: state.ui.state.grid, rotation: state.ui.state.rotation });

            }
          });
          break;
        case Mode.OBJECT:
          proposal.object.state = {};
          sel.rect.blocks.forEach((block) => {
            if (!blockHasObject(proposal, block)) {
              let key = makeKey(block.x, block.y);
              let obj = new Obj({ type: state.ui.state.object, block: block, rotation: state.ui.state.rotation });
              proposal.object.state[key] = obj
            }
          });
          break;
        case Mode.ITEM:
          break;
      }
    } else { //NO SELECTION
      switch (state.ui.state.mode) {
        case Mode.GRID:
          proposal.grid.state = {};
          let key = state.view.state.mousePosition.block.key
          proposal.grid.state[key] = new Grid({ type: state.ui.state.grid, rotation: state.ui.state.rotation })
          break;
        case Mode.OBJECT:
          proposal.object.state = {};
          let obj = new Obj({ type: state.ui.state.object, rotation: state.ui.state.rotation, block: state.view.state.mousePosition.block });
          proposal.object.state[state.view.state.mousePosition.block.key] = obj
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
function blockHasObject(state, block) {
  let key = makeKey(block.x, block.y);
  if (state.object.state[key]) return true;
  //check neighbours
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      key = makeKey(block.x - x, block.y - y);
      let obj = state.object.state[key];
      if (obj) {
        let type = ObjectData.get(obj.type);
        if (type.width >= x + 1 && type.height >= y + 1)
          return true;
      }
    }
  }
}
