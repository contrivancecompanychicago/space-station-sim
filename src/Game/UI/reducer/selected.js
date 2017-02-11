// @flow

// import {remove} from 'lodash'

export default function selected(state:Array<Object> = [], action:Object):Array<Object>{
  switch(action.type){
    case 'SET_SELECTED':
        // if(state.indexOf(action.selected)>-1) return state;
        // state = [...state, action.selected];
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
