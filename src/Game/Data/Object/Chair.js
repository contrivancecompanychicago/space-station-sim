// @flow
import type {ObjectDataType} from '../Object'


import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'CHAIR',
  label: 'Chair',
  image: require('./chair.png'),
  width: 1,
  height: 1,
  blocks: [],
  requirements: {
  },
  abilities: [Ability.CHAIR],
}

export default obj
