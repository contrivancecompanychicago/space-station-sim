// @flow
import type {Objekt} from './base'


const obj:Objekt = {
  id: 'OVEN',
  label: 'Oven',
  image: require('./oven.png'),
  width: 1,
  height: 4,
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
