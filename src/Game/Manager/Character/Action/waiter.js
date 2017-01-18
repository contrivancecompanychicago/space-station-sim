
import engine from 'Game/engine';

import pathToBlock from './pathToBlock';
import pathToObject from './pathToObject';
import idle from './idle';

import {Obj} from 'Game/Data/Object';

export default function* waiter(char){
  let gridManager = engine.getComponent('gridManager');
  let objectManager = engine.getComponent('objectManager');
  yield *pathToObject(char, Obj.TABLE);
  yield *idle(char, 1);
  yield *pathToObject(char, Obj.TABLE2);
  yield *idle(char, 1);


}
