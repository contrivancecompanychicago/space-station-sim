// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'TABLE3',
  label: 'table',
  image: require('./table3.png'),
  width: 1,
  height: 1,
  requirements: {
  },
  abilities: [Ability.PREP_TABLE, Ability.SERVE_TABLE]
}

export default obj
