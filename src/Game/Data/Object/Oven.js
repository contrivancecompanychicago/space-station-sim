// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'OVEN',
  label: 'Oven',
  image: require('./oven.png'),
  width: 1,
  height: 4,
  blocks: [
    {type: a, weight: Weight.ACCESS, x:0, y:0},
    {type: b, weight: Weight.BLOCK, x:0, y:1},
    {type: b, weight: Weight.BLOCK, x:0, y:2},
    {type: b, weight: Weight.BLOCK, x:0, y:3},
  ],
  requirements: {},
  abilities: [Ability.OVEN]
}

export default obj
