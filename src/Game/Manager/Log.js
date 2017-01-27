// @flow
import {keys, defaults} from 'lodash';

export type LogType = 'EVENT'

export default class LogManager{
  type: string;
  log: Array<string>;
  constructor(){
    this.type = 'logManager';
    this.log = []
  }
  log(message:{type:LogType, message:string}){
    this.log.push(message.message);
    if(this.log.length>20){
      this.log.shift();
    }
  }
}
