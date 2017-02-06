// @flow

// import {remove} from 'lodash'

export default function selected(state:Array<Object> = [], action:Object):Array<Object>{
  switch(action.type){
    case 'SET_SELECTED':
        
        state = [action.selected];
    break;
    case 'REMOVE_SELECTED':
        state = state.filter((o) => {
            return (o !== action.selected)
        })
    break;
  }
  return state;
}
