
import {defaults} from 'lodash';
export default class Grid{
  type: string;
  rotation: number;
  constructor(params:Object){
    defaults(this, params);
  }
}
