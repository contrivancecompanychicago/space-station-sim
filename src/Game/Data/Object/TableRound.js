// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'TABLEROUND',
  label: 'table',
  image: require('./Table_v3.png'),
  width: 1,
  height: 1,
  rotation: 'IMAGESET',
  blocks: [
    {type: b, weight: Weight.BLOCK, x:0,y:0},
    {type: a, weight:Weight.ACCESS, x:0,y:-1},
    {type: a, weight:Weight.ACCESS, x:0,y:1},
    {type: a, weight:Weight.ACCESS, x:-1,y:0},
    {type: a, weight:Weight.ACCESS, x:1,y:0},
  ],
  requirements: {
  },
  abilities: [Ability.PREP_TABLE, Ability.SERVE_TABLE, Ability.DINE_TABLE]
}

export default obj
