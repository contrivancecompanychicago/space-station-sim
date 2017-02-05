// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

// import {ObjectBlocks} from '../Object'
const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'CHAIR2',
  label: 'Chair',
  image: require('./chair2.png'),
  width: 1,
  height: 1,
  blocks: [
    {type: a, weight: Weight.ACCESS, x:0, y:-1},
    {type: a, weight: Weight.CHAIR, x:0,y:0},
  ],
  requirements: {
  },
  abilities: [Ability.CHAIR],
}

export default obj
