// @flow
export default function rotation(state:number = 0, action:Object):number{
  switch(action.type){
    case 'ROTATE':
      state = state+1;
      if(state >=4) state = 0;
    break;
  }
  return state;
}
