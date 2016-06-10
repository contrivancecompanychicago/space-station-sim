export default function mode(state = 1, action){
  switch(action.type){
    case 'CHANGE_MODE':
      state = action.id;
    break;
  }
  return state;
}
