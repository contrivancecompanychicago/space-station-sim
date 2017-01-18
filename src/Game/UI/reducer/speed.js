//@flow

import {Speeds} from 'Game/Data/Speed';

export default function speed(state:string = Speeds.NORMAL, action:Object):string{
  switch(action.type){
    case 'CHANGE_SPEED':
      state = action.id;
    break;
  }
  return state;
}
