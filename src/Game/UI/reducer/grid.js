export default function grid(state = 1, action){
  switch(action.type){
    case 'CHANGE_GRID':
      state = action.id;
    break;
  }
  return state;
}
