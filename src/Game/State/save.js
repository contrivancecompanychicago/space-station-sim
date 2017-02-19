//@flow

import state from 'Game/state';
import {keys} from 'lodash'
import config from 'Game/config'

export default function save(savename:string){
    let out = {
        Grid:{},
        Object:{},
        Character:{}
    }

    //reformat to strip crap
    keys(state.Grid).forEach((k) => {
        let grid = state.Grid[k]
        out.Grid[k] = {type:grid.type, rotation:grid.rotation}
    })
    keys(state.Object).forEach((k) => {
        let obj = state.Object[k];
        out.Object[k] = {type:obj.type, rotation:obj.rotation, block:obj.block}
    })
    keys(state.Character).forEach((k) => {
        let char = state.Character[k]
        out.Character[k] = {x:char.x, y:char.y, type:char.type}
    })

    localStorage[config.save.prefix+savename] = JSON.stringify(out)

}