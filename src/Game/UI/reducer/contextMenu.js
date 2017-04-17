// @flow
export default function contextMenuReducer(state:Object, action:Object):Object{
    if(!state || action.type == 'CLOSE_CONTEXT_MENU'){
        state = {show:false}
    }
    if(action.type == 'SHOW_CONTEXT_MENU'){
        state = {
            show:true,
            character: action.character,
            object: action.object,
            position: action.position,
            block: action.block,
            items: action.items,
            characters: action.characters
        }
    }
    return state;
}