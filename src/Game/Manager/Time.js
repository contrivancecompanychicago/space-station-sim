// @flow

import Speed from 'Game/Data/Speed';

import type {TimeState} from 'Game/state'


// export type TimeState = {
//   currentTime: number
// }
export default class Time {
    type: string;
    time: Object;
    deltaTime: number;
    getComponent:Function;
    state:TimeState;
    constructor(state:TimeState, time:Object){
      this.state = state
      this.type = 'timeManager';
      this.time = time;
      this.deltaTime = 0;
    }
    update(time:Object){
      let ui = this.getComponent('uiManager');
      if(time.deltaTime>1){
        //TIME SPIKE
        //user probably changed tabs
        time.deltaTime = 0;
      }
      let speed = Speed[ui.state.speed] || {speed:1}
      time.deltaTime *= speed.speed;
      this.deltaTime = time.deltaTime;

      this.state.currentTime += this.deltaTime * 200
    }

}
