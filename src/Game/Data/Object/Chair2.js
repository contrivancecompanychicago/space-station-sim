// @flow
import type {ObjectDataType} from '../Object'


import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'CHAIR2',
  label: 'Chair',
  image: require('./chair2.png'),
  width: 1,
  height: 1,
  requirements: {
  },
  abilities: [Ability.CHAIR],
}

export default obj
