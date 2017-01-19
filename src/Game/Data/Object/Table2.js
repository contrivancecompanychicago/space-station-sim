// @flow
import type {Objekt} from './base'


import Ability from 'Game/Data/Object/Ability'
const obj:Objekt = {
  id: 'TABLE2',
  label: 'table',
  image: require('./table2.png'),
  width: 1,
  height: 1,
  requirements: {
  },
  abilities: [Ability.DINE_TABLE],
}

export default obj
