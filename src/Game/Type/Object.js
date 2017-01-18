//@flow

import {defaults} from 'lodash';
// import type Point from 'Game/Point';
import type Block from 'Game/Block'

export default class Objekt{
  block: Block;
  type: string;
  constructor(params:Object){
    defaults(this, params);
  }
}
