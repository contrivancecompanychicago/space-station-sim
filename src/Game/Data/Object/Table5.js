// @flow
import type {ObjectDataType} from '../Object'


import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'TABLE5',
  label: 'table',
  image: require('./table5.png'),
  width: 1,
  height: 1,
  requirements: {
  },
  abilities: [Ability.DINE_TABLE],
}

export default obj
