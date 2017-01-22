//@flow
// import {Obj} from 'Game/Data/Object'

export default function item(state:string = "TEST", action:Object):string{
  switch(action.type){
    case 'CHANGE_OBJECT':
      state = action.id;
    break;
  }
  return state;
}
