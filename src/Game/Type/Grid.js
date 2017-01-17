
import {defaults} from 'lodash';
export default class Grid{
  type: string;
  rotation: number;
  constructor(params:Object){
    defaults(this, params);
    if(!this.rotation)this.rotation = 0;
  }
}
