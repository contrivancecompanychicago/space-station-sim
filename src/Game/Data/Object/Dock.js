// @flow
import type {Objekt} from './base'


const obj:Objekt = {
  id: 'DOCK',
  label: 'Dock',
  image: require('./dockspot.png'),
  width: 2,
  height: 2,
  requirements: {
    block:{
        empty:[
          {x:0, y:2},
          {x:1, y:2},
          {x:0, y:3},
          {x:1, y:3},
        ]
    }
  }
}

export default obj
