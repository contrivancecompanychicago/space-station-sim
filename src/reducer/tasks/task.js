import {map} from 'lodash';

export default function task(state = {}, action){
  switch(action.type){

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
        });
      break;

  }
  return state;
}
