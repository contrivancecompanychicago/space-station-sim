//@flow
import Proposer from 'Game/Action/Proposer';
import {parseKey} from 'Util';
import {keys} from 'lodash';
import renderBlock from './block';

import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

const proposer = new Proposer();



export default function renderProposal(state:State, layer:Layer){
  if(state.view.state.selection){
    let proposal = proposer.propose(state);
    if(proposal.Grid){
      // console.log(proposal.Grid);
      keys(proposal.Grid).forEach((key) => {
        let pos = parseKey(key);
        layer.setAlpha(0.6);
        // console.log(key);
        renderBlock(pos, proposal.grid.state[key], state, layer);
        layer.setAlpha(1);
      });
    }
  }
}
