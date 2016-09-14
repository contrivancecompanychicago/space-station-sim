
import Proposer from 'Game/Action/Proposer';
import {parseKey} from 'Util';
import keys from 'lodash.keys';
import renderBlock from './block';
const proposer = new Proposer();

export default function renderProposal(state, layer){
  if(state.View.selection){
    let proposal = proposer.propose(state);
    if(proposal.Grid){
      // console.log(proposal.Grid);
      keys(proposal.Grid).forEach((key) => {
        let pos = parseKey(key);
        layer.context.globalAlpha = 0.6;
        // console.log(key);
        renderBlock(pos, proposal.Grid[key], state, layer);
        layer.context.globalAlpha = 1;
      });
    }
  }
}
