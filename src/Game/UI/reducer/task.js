export default function task(state = 1, action){
  switch(action.type){
    case 'CHANGE_TASK':
      state = action.id;
    break;
  }
  return state;
}
