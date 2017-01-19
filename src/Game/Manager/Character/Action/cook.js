
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import idle from './idle';

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'


export default function* cook(char){
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  yield *pathToObjectWithAbility(char, Ability.FRIDGE);
  yield *idle(char, 1);
  yield *pathToObjectWithAbility(char, Ability.PREP_TABLE);
  yield *idle(char, 1);
  yield *pathToObjectWithAbility(char, Ability.OVEN);
  yield *idle(char, 1);
  yield *pathToObjectWithAbility(char, Ability.SERVE_TABLE);
  yield *idle(char, 1);


}
