import task from 'reducer/task';

export default function(state = [], action){
  switch(action.type) {
    case 'ADD_TASK':
        return [...state, task(undefined, action)];
      break;
    default:
      return state;
  }
}
