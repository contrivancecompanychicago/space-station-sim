// @flow
import type {ObjectDataType} from '../Object'

import Ability from 'Game/Data/Object/Ability'

const obj:ObjectDataType = {
  id: 'FRIDGE',
  label: 'Fridge',
  image: require('./fridge.png'),
  width: 2,
  height: 1,
  requirements: {},
  blocks: [
    {type: 'ACCESS', x:0, y:-1},
    {type: 'BLOCK', x:0,y:0}, {x:1,y:0}],
  abilities: [Ability.FRIDGE],
}

export default obj
