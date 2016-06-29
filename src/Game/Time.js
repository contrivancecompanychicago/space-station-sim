import Speed from 'Game/Type/Speed';

export default class Time {
    constructor(time){
      this.type = 'time';
      this.time = time;

    }
    update(time){
      let ui = this.getComponent('uiManager');
      time.deltaTime *= Speed[ui.state.speed].speed;
    }
}
