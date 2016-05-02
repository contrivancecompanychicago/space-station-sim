// import task from 'reducer/ch';

export default function(state = [], action){
  switch(action.type) {
    case 'ADD_CHARACTER':
        return [...state, action.character];
      break;
    default:
      return state;
  }
}
