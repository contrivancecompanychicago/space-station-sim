// @flow
import {keys, defaults} from 'lodash';

export type LogType = 'EVENT'|'ORDER'|'SERVE'

export type LogEntry = {type:LogType, message:string}

import Manager from 'Game/Manager'


export default class LogManager extends Manager{
  type: string;
  log: Array<LogEntry>;
  constructor(){
    super();
    this.type = 'logManager';
    this.log = []
  }
  addLog(message:LogEntry){
    this.log.push(message);
    if(this.log.length>20){
      this.log.shift();
    }
  }
}
