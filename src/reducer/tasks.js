import build from 'reducer/tasks/build';
import { combineReducers } from 'redux';

export default combineReducers({
  build
})

// import task from 'reducer/task';
//
//
// const taskTypes = ['build'];
//
// export default function(state = {}, action){
//
//   if(action.type.indexOf('TASK')===-1) return state;
//
//   switch(action.type) {
//     case 'ADD_TASK':
//         return [...state, task(undefined, action)];
//       break;
//     default:
//       return state;
//   }
//
// }
