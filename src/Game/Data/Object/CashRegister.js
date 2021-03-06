// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'CASHREGISTER',
  label: 'Cash Register',
  image: require('./test.png'),
  width: 1,
  height: 1,
  blocks: [
    {type: a, weight: Weight.ACCESS, x:0, y:-1},
    {type: b, weight: Weight.BLOCK, x:0, y:0},
    {type: a, weight: Weight.ACCESS, x:0, y:1},
  ],
  abilities: [Ability.REGISTER]
}

export default obj
