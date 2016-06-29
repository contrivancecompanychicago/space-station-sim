import {Speeds} from 'Game/Type/Speed';

export default function speed(state = Speeds.NORMAL, action){
  switch(action.type){
    case 'CHANGE_SPEED':
      state = action.id;
    break;
  }
  return state;
}
