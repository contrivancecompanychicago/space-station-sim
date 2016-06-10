export default function mode(state = 1, action){
  switch(action.type){
    case 'CHANGE_MODE':
      state ++;
    break;
  }
  return state;
}
