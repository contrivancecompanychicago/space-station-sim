// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

// import {ObjectBlocks} from '../Object'
const a = 'ACCESS';
const b = 'BLOCK';

const obj:ObjectDataType = {
  id: 'FRIDGE',
  label: 'Fridge',
  image: require('./fridge.png'),
  width: 2,
  height: 1,
  requirements: {},
  blocks: [
    {type: a, x:0, y:-1},{type: a, x:1, y:-1},
    {type: b, x:0,y:0}, {type:b, x:1,y:0}
  ],
  abilities: [Ability.FRIDGE],
}

export default obj
