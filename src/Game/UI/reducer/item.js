//@flow
import {Item} from 'Game/Data/Item'

export default function item(state:string = Item.TEST, action:Object):string{
  switch(action.type){
    case 'CHANGE_ITEM':
      state = action.id;
    break;
  }
  return state;
}
