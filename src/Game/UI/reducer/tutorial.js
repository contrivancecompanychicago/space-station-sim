export default function tutorial(state = {}, action){
    if(action.type === 'SHOW_TUTORIAL'){
        // if(action.next)action.next();
        state = action;
    }
    if(action.type === 'HIDE_TUTORIAL'){
        state = {} 
    }
    return state
}