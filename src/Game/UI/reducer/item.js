//@flow

export default function item(state:string, action:Object):string{
  switch(action.type){
    case 'CHANGE_ITEM':
      state = action.id;
    break;
  }
  return state;
}
