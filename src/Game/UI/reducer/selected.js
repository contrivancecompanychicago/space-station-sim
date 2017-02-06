// @flow
export default function selected(state:Array<Object> = [], action:Object):Array<Object>{
  switch(action.type){
    case 'SET_SELECTED':
        state = [action.selected];
    break;
  }
  return state;
}
