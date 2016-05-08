import uniqid from 'Game/Util/uniqid';
const defaults = {};


export default function build(state = {}, action){
  switch(action.type){
    case 'ADD_TASK':
      if(action.task === 'build'){
        if(!action.id) action.id = uniqid();
        state[action.id] = action;
      }

    default:
     return state;
  }
}
