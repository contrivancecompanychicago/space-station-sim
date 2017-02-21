//@flow

import state from 'Game/state';
import {keys} from 'lodash'
import config from 'Game/config'

export default function save(savename:string){

    let out = {
        grid: state.grid.save(),
        object: state.object.save(),
        character: state.character.save(),
    }

    localStorage[config.save.prefix+savename] = JSON.stringify(out)

}