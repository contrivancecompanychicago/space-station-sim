// @flow
import type {ObjectDataType} from '../Object'


import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'TABLE4',
  label: 'serve',
  image: require('./table4.png'),
  width: 1,
  height: 1,
  blocks: [],
  requirements: {
  },
  abilities: [Ability.SERVE_TABLE],
}

export default obj
