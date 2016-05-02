import build from './tasks/build';

export default function task(state = {}, action){
  switch(action.type) {
    case 'ADD_TASK':
    switch(action.task){
      case 'build':
        console.log('build');
        return build(state, action);
      break;
    }
    break;
    default:
    return state;
  }
}
