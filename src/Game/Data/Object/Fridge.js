// @flow
import type {Objekt} from './base'

import Ability from 'Game/Data/Object/Ability'

const obj:Objekt = {
  id: 'FRIDGE',
  label: 'Fridge',
  image: require('./fridge.png'),
  width: 2,
  height: 1,
  requirements: {},
  abilities: [Ability.FRIDGE],
}

export default obj
