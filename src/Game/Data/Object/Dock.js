// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'DOCK',
  label: 'Dock',
  image: require('./dockspot.png'),
  width: 2,
  height: 2,
  blocks: [],
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
