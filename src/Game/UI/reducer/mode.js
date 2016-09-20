import {Modes } from 'Game/Type/Mode';

export default function mode(state = 1, action){
  switch(action.type){
    case 'CHANGE_MODE':
      state = action.id;
    break;
    case 'CHANGE_GRID':
      state = Modes.GRID;
    break;
    case 'CHANGE_ITEM':
      state = Modes.ITEM;
    break;
    case 'CHANGE_CHAR':
      state = Modes.CHAR;
    break;
    case 'CHANGE_TASK':
      state = Modes.TASK;
    break;
    case 'CHANGE_OBJECT':
      state = Modes.OBJECT;
    break;
  }
  return state;
}
