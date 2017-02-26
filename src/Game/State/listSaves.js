// @flow
import {keys} from 'lodash'
import config from 'Game/config'

import demo1 from './demo1'
import demo2 from './demo2'
import demo3 from './demo3'

import small from './saves/small'
import large from './saves/large'

export default function listSaves(){

    localStorage['save_small'] = JSON.stringify(small)
    localStorage['save_large'] = JSON.stringify(large)

    localStorage['save_demo1'] = JSON.stringify(demo1)
    localStorage['save_demo2'] = JSON.stringify(demo2)
    localStorage['save_demo3'] = JSON.stringify(demo3)

    return Object.keys(localStorage).filter((k) => {
        return k.indexOf(config.save.prefix) === 0
    }).map((k)=>{
        return k.substr(config.save.prefix.length)
    })
}