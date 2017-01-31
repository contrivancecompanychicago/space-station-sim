// @flow
import type {ObjectDataType} from '../Object'

// import {ObjectBlocks} from '../Object'
const a = 'ACCESS';
const b = 'BLOCK';

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'DRAWERS',
  label: 'Drawers',
  image: require('./drawers.png'),
  width: 1,
  height: 1,
  blocks: [
    {type: a, x:0, y:1},
    {type: b, x:0,y:0},
  ],
  requirements: {
  },
  abilities: [Ability.MAKE_COFFEE],
}

export default obj
