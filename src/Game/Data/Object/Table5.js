// @flow
import type {ObjectDataType} from '../Object'

const a = 'ACCESS';
const b = 'BLOCK';

import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'TABLE5',
  label: 'dine',
  image: require('./table5.png'),
  width: 1,
  height: 1,
  blocks: [{type: b, x:0,y:0},],
  requirements: {
  },
  abilities: [Ability.DINE_TABLE],
}

export default obj
