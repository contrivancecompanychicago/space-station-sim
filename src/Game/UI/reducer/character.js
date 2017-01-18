// @flow
export default function item(state:string = "", action:Object):string{
  switch(action.type){
    case 'CHANGE_CHAR':
      state = action.id;
    break;
  }
  return state;
}
