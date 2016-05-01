export default function(state = [], action){
  // console.log("tasking", action);
  switch(action.type) {
    case 'ADD_TASK':
        return [...state, action.task]
      break;
    default:
      return state;
  }
}
