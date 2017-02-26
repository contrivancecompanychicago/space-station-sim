// @flow
import type {CharacterType} from 'Game/Data/Character';
export default function character(state:CharacterType = "WORKER", action:Object):CharacterType{
  switch(action.type){
    case 'CHANGE_CHAR':
      state = action.id;
    break;
  }
  return state;
}
