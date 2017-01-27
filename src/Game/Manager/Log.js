// @flow
import {keys, defaults} from 'lodash';

export type LogType = 'EVENT'|'ORDER'|'SERVE'

export type LogEntry = {type:LogType, message:string}

export default class LogManager{
  type: string;
  log: Array<LogEntry>;
  constructor(){
    this.type = 'logManager';
    this.log = []
  }
  log(message:LogEntry){
    this.log.push(message);
    if(this.log.length>20){
      this.log.shift();
    }
  }
}
