// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'TABLETALL',
  label: 'table',
  image: require('./tabletall.png'),
  width: 1,
  height: 1,
  rotation: 'IMAGESET',
  blocks: [
    {type: b, weight: Weight.BLOCK, x:0,y:0},
  ],
  requirements: {
  },
  abilities: [Ability.PREP_TABLE, Ability.SERVE_TABLE]
}

export default obj
