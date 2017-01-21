//@flow
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObjectWithAbility from './pathToObjectWithAbility';
import idle from './idle';

import Ability from 'Game/Data/Object/Ability'

import type Character from 'Game/Type/Character'
import type ObjectManager from 'Game/Manager/Object'



export default function* waiter(char:Character):Generator<*,*,*>{
  let gridManager = engine.getComponent('gridManager');
  let objectManager:ObjectManager = engine.getComponent('objectManager');



  yield *pathToObjectWithAbility(char, Ability.SERVE_TABLE);
  yield *idle(char, 1);
  yield *pathToObjectWithAbility(char, Ability.DINE_TABLE);
  yield *idle(char, 1);

}
