//@flow
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import idle from './idle';

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import Item from 'Game/Type/Item'

// import

export default function* cook(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  let itemManager = engine.getComponent('itemManager')
  let obj = yield *pathToObjectWithAbility(char, Ability.FRIDGE);
  // if(obj){
  //   itemManager.addItem({position: obj.block.center, type:})
  // }
  yield *idle(char, 1);
  yield *pathToObjectWithAbility(char, Ability.PREP_TABLE);
  yield *idle(char, 1);
  yield *pathToObjectWithAbility(char, Ability.OVEN);
  yield *idle(char, 1);
  yield *pathToObjectWithAbility(char, Ability.SERVE_TABLE);
  yield *idle(char, 1);


}
