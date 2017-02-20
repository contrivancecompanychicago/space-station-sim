// @flow

import Speed from 'Game/Data/Speed';
import state from 'Game/state'
import engine from 'Game/engine'

export type TimeState = {
    currentTime: number
}

export default class TimeModel {
    state: TimeState;
    deltaTime: number;
    constructor(state: TimeState = {currentTime:0}) {
        this.state = state
        this.deltaTime = 0;
    }
}
