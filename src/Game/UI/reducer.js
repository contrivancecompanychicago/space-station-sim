// @flow
import { combineReducers } from 'redux';
import mode from './reducer/mode';
import grid from './reducer/grid';
import item from './reducer/item';
import character from './reducer/character';
import task from './reducer/task';
import speed from './reducer/speed';
import object from './reducer/object';
import rotation from './reducer/rotation';
import panel from './reducer/panel';
import selected from './reducer/selected';
import tutorial from './reducer/tutorial';
import highlight from './reducer/highlight';


import type {UIState} from 'Game/Model/UI'

// export default function reducer(state = {}, action){
//   return state;
// }

export default combineReducers({
  mode,
  grid,
  item,
  character,
  task,
  speed,
  object,
  rotation,
  panel,
  selected,
  tutorial,
  highlight,
});
