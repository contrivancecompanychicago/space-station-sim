// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'OVEN',
  label: 'Oven',
  image: require('./stoneoven.png'),
  width: 2,
  height: 2,
  blocks: [
    {type: b, weight: Weight.BLOCK, x:0, y:0},
	{type: b, weight: Weight.BLOCK, x:0, y:1},
    {type: b, weight: Weight.BLOCK, x:1, y:0},
    {type: b, weight: Weight.BLOCK, x:1, y:1},
    {type: a, weight: Weight.ACCESS, x:0, y:2},
    {type: a, weight: Weight.ACCESS, x:1, y:2},
  ],
  requirements: {},
  abilities: [Ability.OVEN]
}

export default obj
