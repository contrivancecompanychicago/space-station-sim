export default function item(state = 1, action){
  switch(action.type){
    case 'CHANGE_CHAR':
      state = action.id;
    break;
  }
  return state;
}
