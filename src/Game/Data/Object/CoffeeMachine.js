// @flow
import type {ObjectDataType} from '../Object'

// import {ObjectBlocks} from '../Object'
const a = 'ACCESS';
const b = 'BLOCK';

import Ability from 'Game/Data/Object/Ability'

import Weight from 'Game/Data/Grid/Weight'

const obj:ObjectDataType = {
  id: 'COFFEEMACHINE',
  label: 'Coffee Machine',
  image: require('./coffeemachine.png'),
  width: 1,
  height: 1,
  rotation: 'IMAGESET',
  imageSet: [
    require('./CoffeeBackv2.png'),
    require('./CoffeeSidev2.png'),
    require('./CoffeeFrontv2.png'),
    require('./CoffeeSidev2.png'),
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
