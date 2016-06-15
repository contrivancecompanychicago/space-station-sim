export default function mode(state = 1, action){
  switch(action.type){
    case 'CHANGE_MODE':
      state = action.id;
    break;
    case 'CHANGE_GRID':
      state = 'GRID'; //hack
    break;
    case 'CHANGE_ITEM':
      state = 'ITEM'; //hack
    break;
  }
  return state;
}
