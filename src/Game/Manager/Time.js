import Speed from 'Game/Data/Speed';

export default class Time {
    constructor(time){
      this.type = 'time';
      this.time = time;
      this.deltaTime = 0;
    }
    update(time){
      let ui = this.getComponent('uiManager');
      time.deltaTime *= Speed[ui.state.speed].speed;
      this.deltaTime = time.deltaTime;
    }

}
