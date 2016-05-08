import uniqid from 'Game/Util/uniqid';
import task from 'reducer/tasks/task'
const defaults = {};


export default function build(state = {}, action){
  state = task(state, action);
  switch(action.type){
    case 'ADD_TASK':
      if(action.task === 'build'){
        if(!action.id) action.id = uniqid();
        state[action.id] = action;
      }
    break;
  }
  return state
}
