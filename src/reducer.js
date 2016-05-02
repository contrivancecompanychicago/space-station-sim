import tasks from 'reducer/tasks';

import { combineReducers } from 'redux';

export default combineReducers({
  tasks
})
// export default function reducer(state = {}, action) {
//
//   return {
//     tasks: tasks(state.task, action)
//   }
//
//   return state;
// }
