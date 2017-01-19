// @flow
import type {Objekt} from './base'

import Ability from 'Game/Data/Object/Ability'

const obj:Objekt = {
  id: 'OVEN',
  label: 'Oven',
  image: require('./oven.png'),
  width: 1,
  height: 4,
  requirements: {},
  abilities: [Ability.OVEN]
}

export default obj
