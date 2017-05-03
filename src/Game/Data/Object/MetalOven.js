// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const a = 'ACCESS';
const b = 'BLOCK';

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'METALOVEN',
  label: 'Oven',
  image: require('./OvenFront.png'),
  width: 2,
  height: 1,
  rotation: 'IMAGESET',
  imageSet: [
    require('./OvenFront.png'),
    require('./OvenSide.png'),
    require('./OvenBack.png'),
    require('./OvenSide.png'),
  ],
  blocks: [
    {type: a, weight: Weight.ACCESS, x:0, y:-1},
    {type: b, weight: Weight.BLOCK, x:0, y:0},
    {type: b, weight: Weight.BLOCK, x:1, y:0},
    // {type: b, weight: Weight.BLOCK, x:0, y:3},
  ],
  requirements: {},
  abilities: [Ability.OVEN]
}

export default obj
