// @flow

import Speed from 'Game/Data/Speed';

export default class Time {
    type: string;
    time: Object;
    deltaTime: number;
    getComponent:Function
    constructor(time:Object){
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
