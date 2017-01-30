// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'TABLE3',
  label: 'prep',
  image: require('./table3.png'),
  width: 1,
  height: 1,
  blocks: [],
  requirements: {
  },
  abilities: [Ability.PREP_TABLE]
}

export default obj
