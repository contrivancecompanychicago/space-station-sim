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
  addLog(message:LogEntry){
    this.log.push(message);
    if(this.log.length>20){
      this.log.shift();
    }
    console.log(this.log);
  }
}
