
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import idle from './idle';
import wander from './wander'

// import {Obj} from 'Game/Data/Object';
import Ability from 'Game/Data/Object/Ability'


export default function* cook(char){
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  yield *pathToObjectWithAbility(char, Ability.CHAIR);
  yield *idle(char, 5);
  yield *wander(char);


}
