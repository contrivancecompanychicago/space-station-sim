// @flow
import type {ObjectDataType} from '../Object'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'
import Ability from 'Game/Data/Object/Ability'
const obj:ObjectDataType = {
  id: 'TABLE4',
  label: 'serve',
  image: require('./table4.png'),
  width: 1,
  height: 1,
  rotation: 'IMAGESET',
  blocks: [
    {type: a, weight:Weight.ACCESS, x:0,y:-1},
    {type: b, weight:Weight.BLOCK, x:0,y:0},
    {type: a, weight:Weight.ACCESS, x:0,y:1},
  ],
  requirements: {
  },
  abilities: [Ability.SERVE_TABLE],
}

export default obj
