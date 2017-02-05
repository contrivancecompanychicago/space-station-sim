// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

import Weight from 'Game/Data/Grid/Weight'
const a = 'ACCESS';
const b = 'BLOCK';
const obj:ObjectDataType = {
  id: 'TABLE3',
  label: 'prep',
  image: require('./table3.png'),
  width: 1,
  height: 1,
  blocks: [
    {type: b, weight: Weight.BLOCK, x:0,y:0},
    {type: a, weight: Weight.ACCESS, x:0,y:1},

  ],
  requirements: {
  },
  abilities: [Ability.PREP_TABLE]
}

export default obj
