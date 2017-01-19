// @flow
import type {Objekt} from './base'

import Ability from 'Game/Data/Object/Ability'

const obj:Objekt = {
  id: 'TABLE',
  label: 'table',
  image: require('./table.png'),
  width: 1,
  height: 1,
  requirements: {
  },
  abilities: [Ability.PREP_TABLE, Ability.SERVE_TABLE]
}

export default obj
