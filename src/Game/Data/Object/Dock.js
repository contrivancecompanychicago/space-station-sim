// @flow
import type {Objekt} from './base'

import Ability from 'Game/Data/Object/Ability'

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
  },
  abilities: [Ability.SPAWN]
}

export default obj
