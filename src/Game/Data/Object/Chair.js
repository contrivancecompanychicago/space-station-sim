// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

// import {ObjectBlocks} from '../Object'
const a = 'ACCESS';
const b = 'BLOCK';

const obj:ObjectDataType = {
  id: 'CHAIR',
  label: 'Chair',
  image: require('./chair.png'),
  width: 1,
  height: 1,
  blocks: [
    {type: a, x:0, y:-1},
    {type: a, x:0,y:0},
  ],
  requirements: {
  },
  abilities: [Ability.CHAIR],
}

export default obj
