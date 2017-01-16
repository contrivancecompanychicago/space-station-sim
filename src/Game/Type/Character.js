// @flow

import type Point from 'Game/Point';
import {defaults} from 'lodash';
import uniqid from 'Util/uniqid';


export default class Character{
  id: string;
  position: Point;
  firstname: string;
  lastname: string;
  action: ?Object;
  task: string;
  constructor(params:Object){
    defaults(this, params);
    if(!this.id) this.id = uniqid();
  }
}
