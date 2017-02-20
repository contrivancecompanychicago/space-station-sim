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
    keys(state.grid.state).forEach((k) => {
        let grid = state.grid.state[k]
        out.Grid[k] = {type:grid.type, rotation:grid.rotation}
    })
    keys(state.object.state).forEach((k) => {
        let obj = state.object.state[k];
        out.Object[k] = {type:obj.type, rotation:obj.rotation, block:obj.block}
    })
    keys(state.character.state).forEach((k) => {
        let char = state.character.state[k]
        out.Character[k] = {x:char.x, y:char.y, type:char.type}
    })

    localStorage[config.save.prefix+savename] = JSON.stringify(out)

}