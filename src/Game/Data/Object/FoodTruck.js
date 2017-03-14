// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'FOODTRUCK',
  label: 'Food Truck',
  image: require('./foodtruck.png'),
  width: 8,
  height: 5,
  blocks: [
    {type: b, weight: Weight.BLOCK, x:0, y:0},
	{type: b, weight: Weight.BLOCK, x:0, y:1},
    {type: b, weight: Weight.BLOCK, x:1, y:0},
    {type: b, weight: Weight.BLOCK, x:1, y:1},
    {type: a, weight: Weight.ACCESS, x:0, y:2},
    {type: a, weight: Weight.ACCESS, x:1, y:2},
  ],
  requirements: {},
  abilities: []
}

export default obj
