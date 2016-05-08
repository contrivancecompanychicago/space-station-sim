import uniqid from 'Game/Util/uniqid';
import {map} from 'lodash';
const defaults = {};


export default function build(state = {}, action){
  switch(action.type){
    case 'ADD_TASK':
      if(action.task === 'build'){
        if(!action.id) action.id = uniqid();
        state[action.id] = action;
      }
    break;
    case 'REMOVE_TASK':
      if(state[action.id]){
        delete state[action.id];
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

    case 'UNASSIGN_TASK_WORKER':
      map(state, (val) =>{
        if(val.worker && val.worker === action.worker) delete val.worker;
        return val;
      })
    break;





    // default:
    //  return state;
  }
  return state
}
