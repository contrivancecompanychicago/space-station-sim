import task from 'reducer/task';


export default function reducer(state = {}, action) {
  return {
    task: task(state.task, action)
  }

  return state;
}
