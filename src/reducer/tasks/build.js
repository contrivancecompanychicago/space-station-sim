import uniqid from 'Game/Util/uniqid';
const defaults = {};


export default function build(state = {}, action){
  switch(action.type){
    case 'ADD_TASK':
      if(action.task === 'build'){
        if(!action.id) action.id = uniqid();
        state[action.id] = action;
      }
    break;

    case 'ASSIGN_TASK':
      if(state[action.id]){
        state[action.id].worker = action.worker;
      }
    break;

    case 'UNASSIGN_TASK':
      if(state[action.id]){
        delete state[action.id].worker;
      }
    break;



    // default:
    //  return state;
  }
  return state
}
