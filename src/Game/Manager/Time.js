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
      this.type = 'time';
      this.time = time;
      this.deltaTime = 0;
    }
    update(time:Object){
      let ui = this.getComponent('uiManager');
      time.deltaTime *= Speed[ui.state.speed].speed;
      this.deltaTime = time.deltaTime;
    }

}
