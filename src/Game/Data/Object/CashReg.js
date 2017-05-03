// @flow
import type {ObjectDataType} from '../Object'

// import {ObjectBlocks} from '../Object'
const a = 'ACCESS';
const b = 'BLOCK';

import Ability from 'Game/Data/Object/Ability'

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'CASHREG',
  label: 'Cash Register',
  image: require('./CashReg_Front.png'),
  width: 1,
  height: 1,
  rotation: 'IMAGESET',
  imageSet: [
    require('./CashReg_Front.png'),
    require('./CashReg_Left.png'),
    require('./CashReg_Back.png'),
    require('./CashReg_Right.png'),
  ],
  blocks: [
    {type: a, weight:Weight.ACCESS , x:0, y:1},
    {type: b, weight:Weight.BLOCK , x:0,y:0},
    {type: a, weight:Weight.ACCESS , x:0, y:-1},
  ],
  requirements: {
  },
  abilities: [Ability.REGISTER],
}

export default obj
