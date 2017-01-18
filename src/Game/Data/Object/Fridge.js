// @flow
import type {Objekt} from './base'


const obj:Objekt = {
  id: 'FRIDGE',
  label: 'Fridge',
  image: require('./fridge.png'),
  width: 2,
  height: 1,
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
