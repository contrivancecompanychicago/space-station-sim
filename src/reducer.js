import grid from 'reducer/grid';
import tasks from 'reducer/tasks';
import timeScale from 'reducer/timeScale';
import ui from 'reducer/ui';
import view from 'reducer/view';

import { combineReducers } from 'redux';

export default combineReducers({
  grid,
  tasks,
  timeScale,
  ui,
  view
});
// export default function reducer(state = {}, action) {
//
//   return {
//     tasks: tasks(state.task, action)
//   }
//
//   return state;
// }
