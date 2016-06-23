import { combineReducers } from 'redux';
import mode from './reducer/mode';
import grid from './reducer/grid';
import item from './reducer/item';
import character from './reducer/character';
import task from './reducer/task';


// export default function reducer(state = {}, action){
//   return state;
// }

export default combineReducers({
  mode,
  grid,
  item,
  character,
  task
});
