// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'FRIDGE',
  label: 'Fridge',
  image: require('./fridge.png'),
  width: 2,
  height: 1,
  requirements: {},
  abilities: [Ability.FRIDGE],
}

export default obj
