// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'OVEN',
  label: 'Oven',
  image: require('./oven.png'),
  width: 1,
  height: 4,
  blocks: [],
  requirements: {},
  abilities: [Ability.OVEN]
}

export default obj
