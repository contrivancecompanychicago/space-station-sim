//@flow

import {defaults} from 'lodash';
import type Point from 'Game/Point';

export default class Objekt{
  block:Point;
  type: string;
  constructor(params:Object){
    defaults(this, params);
  }
}
