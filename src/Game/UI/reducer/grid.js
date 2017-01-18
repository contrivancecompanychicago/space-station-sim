// @flow
export default function grid(state:string, action:Object):string{
  switch(action.type){
    case 'CHANGE_GRID':
      state = action.id;
    break;
    case 'CHANGE_TASK':
      state = action.grid;
    break;
  }
  return state;
}
