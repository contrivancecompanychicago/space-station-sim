// @flow

export type LogType = 'EVENT' | 'ORDER' | 'SERVE'

export type LogEntry = { type: LogType, message: string }

export default class LogModel {
	type: string;
	log: Array<LogEntry>;

	constructor() {
		this.log = []
	}

	addLog(message: LogEntry) {
		this.log.push(message);
		if (this.log.length > 20) {
			this.log.shift();
		}
	}
	getLogs():Array<LogEntry>{
		return this.log;
	}

}
