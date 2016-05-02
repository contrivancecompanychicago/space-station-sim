export default function build(state = {}, action){
  switch(action.type){
    case 'ADD_TASK':
      return {
        task: 'build',
        x: action.x,
        y: action.y,
        block: action.block
      }

    default:
     return state;
  }
}
