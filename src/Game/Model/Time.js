// @flow

import Speed from 'Game/Data/Speed';
import state from 'Game/state'

export type TimeState = {
    currentTime: number
}



export default class TimeManager {
    time: Object;
    deltaTime: number;
    state: TimeState;
    constructor(state: TimeState, time: Object) {
        this.state = state
        this.time = time;
        this.deltaTime = 0;
    }
    update(time: Object) {
        //   let ui = this.getComponent('uiManager');
        let ui = state.ui
        if (time.deltaTime > 1) {
            //TIME SPIKE
            //user probably changed tabs
            time.deltaTime = 0;
        }
        let speed = Speed[ui.state.speed] || { speed: 1 }
        time.deltaTime *= speed.speed;
        this.deltaTime = time.deltaTime;

        this.state.currentTime += this.deltaTime * 200
    }

}
