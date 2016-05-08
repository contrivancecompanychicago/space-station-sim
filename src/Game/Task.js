import uniqid from 'Game/Util/uniqid';

export const state = {};

export default class Task {
  static add()
  static assign(taskid, workerid){
    if(!state[taskid]) throw new Error('invalid task id in Task.constructor');
    state[taskid].worker = workerid;
  }
}
