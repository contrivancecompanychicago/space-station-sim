//@flow
export default function item(state:string, action:Object):string{
  switch(action.type){
    case 'CHANGE_OBJECT':
      state = action.id;
    break;
  }
  return state;
}
