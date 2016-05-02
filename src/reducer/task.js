export default function task(state = [], action){
  switch(action.type) {
    case 'ADD_TASK':
        return state, action.task
      break;
    default:
      return state;
  }
}
