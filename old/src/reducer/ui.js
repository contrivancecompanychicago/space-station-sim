
export default function ui(state = {}, action){
  if(!state.block) state.block = 'plain';
  if(!state.item) state.item = 'dockingbay';
  if(!state.mode) state.mode = 'block';
  if(!state.room) state.room = 'shop';

  if(action.type === 'UI_SELECT_BLOCK'){
    state.block = action.id;
  };
  if(action.type === 'UI_SELECT_ITEM'){
    state.item = action.id;
  };
  if(action.type === 'UI_SELECT_MODE'){
    state.mode = action.id;
  };
  if(action.type === 'UI_SELECT_ROOM'){
    state.room = action.id;
  };

  return state;
}
