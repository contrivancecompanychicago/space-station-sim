// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

const obj:ObjectDataType = {
  id: 'OVEN',
  label: 'Oven',
  image: require('./oven.png'),
  width: 1,
  height: 4,
  blocks: [
    {type: a, x:0, y:0},
    {type: b, x:0, y:1},
    {type: b, x:0, y:2},
    {type: b, x:0, y:3},
  ],
  requirements: {},
  abilities: [Ability.OVEN]
}

export default obj
