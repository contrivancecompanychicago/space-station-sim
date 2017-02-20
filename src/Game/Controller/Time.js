// @flow


import state from 'Game/state'
import Speed from 'Game/Data/Speed';

export default class TimeController {
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
        state.time.deltaTime = time.deltaTime;

        state.time.state.currentTime += state.time.deltaTime * 200
    }
}