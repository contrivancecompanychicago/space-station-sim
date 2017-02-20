// @flow

import Speed from 'Game/Data/Speed';
import state from 'Game/state'
import engine from 'Game/engine'

export type TimeState = {
    currentTime: number
}



export default class TimeModel {
    time: Object;
    deltaTime: number;
    state: TimeState;
    constructor(state: TimeState = {currentTime:0}) {
        this.state = state
        this.time = engine.time;
        this.deltaTime = 0;
    }
    // update(time: Object) {
    //     //   let ui = this.getComponent('uiManager');
    //     let ui = state.ui
    //     if (time.deltaTime > 1) {
    //         //TIME SPIKE
    //         //user probably changed tabs
    //         time.deltaTime = 0;
    //     }
    //     let speed = Speed[ui.state.speed] || { speed: 1 }
    //     time.deltaTime *= speed.speed;
    //     this.deltaTime = time.deltaTime;

    //     this.state.currentTime += this.deltaTime * 200
    // }

}
