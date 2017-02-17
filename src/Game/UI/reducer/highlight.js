//@flow


export default function highlight(state:Array<string> = [], action:Object){
    if(action.type == "HIGHLIGHT"){
        state = action.elements
    }
    return state
}