//@flow

import {defaults} from 'lodash';
import type Point from 'Game/Point';

export default class Object{
  block:Point;
  type: string;
  constructor(params:Object){
    defaults(this, params);
  }
}
