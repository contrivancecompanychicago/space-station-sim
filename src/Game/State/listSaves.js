// @flow
import {keys} from 'lodash'
import config from 'Game/config'

export default function listSaves(){
    // console.log('listing saves');
    return keys(localStorage).filter((k) => {
        return k.indexOf(config.save.prefix) === 0
    }).map((k)=>{
        return k.substr(config.save.prefix.length)
    })
}