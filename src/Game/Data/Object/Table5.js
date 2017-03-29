// @flow
import type {ObjectDataType} from '../Object'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'
import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'TABLE5',
  label: 'dine',
  image: require('./table5.png'),
  width: 1,
  height: 1,
  depth: 8,
  rotation: 'IMAGESET',
  blocks: [
    {type: b, weight: Weight.BLOCK, x:0,y:0},
  ],
  requirements: {
  },
  abilities: [Ability.DINE_TABLE],
}

export default obj
