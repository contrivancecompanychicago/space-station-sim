//@flow
import {Mode } from 'Game/Data/Mode';

export default function mode(state:string = Mode.SELECT, action:Object):string{
  switch(action.type){
    case 'CHANGE_MODE':
      state = action.id;
    break;
    case 'CHANGE_GRID':
      state = Mode.GRID;
    break;
    case 'CHANGE_ITEM':
      state = Mode.ITEM;
    break;
    case 'CHANGE_CHAR':
      state = Mode.CHAR;
    break;
    case 'CHANGE_TASK':
      state = Mode.TASK;
    break;
    case 'CHANGE_OBJECT':
      state = Mode.OBJECT;
    break;

    
    case 'TOGGLE_HIRING_PANEL':
    case 'TOGGLE_STAFF_PANEL':
    case 'TOGGLE_ORDERS_PANEL':
    case 'TOGGLE_LOG_PANEL':
    case 'TOGGLE_TALENT_PANEL':
    case 'TOGGLE_SAVE_PANEL':
      state = Mode.SELECT;
    break;
  }
  return state;
}
