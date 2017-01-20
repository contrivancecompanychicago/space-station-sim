// @flow
import type {ObjectDataType} from '../Object'


import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'DRAWERS',
  label: 'Drawers',
  image: require('./drawers.png'),
  width: 1,
  height: 1,
  requirements: {
  },
  abilities: [Ability.DINE_TABLE],
}

export default obj
