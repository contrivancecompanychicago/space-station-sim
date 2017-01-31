// @flow
import type {ObjectDataType} from '../Object'

const a = 'ACCESS';
const b = 'BLOCK';

import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'TABLE4',
  label: 'serve',
  image: require('./table4.png'),
  width: 1,
  height: 1,
  blocks: [
    {type: b, x:0,y:0},
    {type: a, x:0,y:1},
  ],
  requirements: {
  },
  abilities: [Ability.SERVE_TABLE],
}

export default obj
