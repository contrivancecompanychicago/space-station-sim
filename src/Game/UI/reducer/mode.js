import {Modes } from 'Game/Type/Mode';

export default function mode(state = 1, action){
  switch(action.type){
    case 'CHANGE_MODE':
      state = action.id;
    break;
    case 'CHANGE_GRID':
      state = Modes.GRID; //hack
    break;
    case 'CHANGE_ITEM':
      state = Modes.ITEM; //hack
    break;
    case 'CHANGE_CHAR':
      state = Modes.CHAR; //hack
    break;
  }
  return state;
}
