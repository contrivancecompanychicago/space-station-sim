// @flow
import type {ObjectDataType} from '../Object'

// import {ObjectBlocks} from '../Object'
const a = 'ACCESS';
const b = 'BLOCK';

import Ability from 'Game/Data/Object/Ability'

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'CHAIRIMAGESET',
  label: 'chair',
  image: require('./ChairSide.png'),
  width: 1,
  height: 1,
  rotation: 'IMAGESET',
  imageSet: [
    require('./ChairBack.png'),
    require('./ChairSide.png'),
    require('./ChairFront.png'),
    require('./ChairSide.png'),
  ],
  blocks: [
    {type: a, weight:Weight.ACCESS , x:0, y:1},
    {type: b, weight:Weight.BLOCK , x:0,y:0},
  ],
  requirements: {
  },
  abilities: [Ability.MAKE_COFFEE],
}

export default obj
