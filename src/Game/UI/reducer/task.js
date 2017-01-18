//@flow
export default function task(state:string, action:Object):string{
  switch(action.type){
    case 'CHANGE_TASK':
      state = action.id;
    break;
  }
  return state;
}
