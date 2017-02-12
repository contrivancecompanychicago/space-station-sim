export default function tutorial(state = {}, action){
    if(action.type === 'SHOW_TUTORIAL'){
        // console.log('sdhowing tute');
        // if(action.next)action.next();
        state = action;
    }
    return state
}