// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'SPAWN',
  label: 'Spawn Point',
  image: require('./test.png'),
  width: 1,
  height: 1,
  blocks: [],
  abilities: [Ability.SPAWN]
}

export default obj
