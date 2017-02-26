//@flow

import state from 'Game/state';
import {keys} from 'lodash'
import config from 'Game/config'

export default function save(savename:string){

    let out = {
        grid: state.grid.save(),
        object: state.object.save(),
        character: state.character.save(),
        item: state.item.save()
    }

    localStorage[config.save.prefix+savename] = JSON.stringify(out)

    // if(process){
    //     let fs = require('fs');
    //     let path = require('path')
    //     // let filename = path.join(__dirname, config.save.prefix+savename+'.js')
    //     let filename = 'saves/'+savename+'.js'
    //     // console.log(__dirname, config.save, filename)
    //     fs.writeFileSync(
    //         filename,
    //         JSON.stringify(out)
    //         );
    // }

}