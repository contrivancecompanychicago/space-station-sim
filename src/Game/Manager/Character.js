
import uniqid from 'Util/uniqid';
import {keys, defaults} from 'lodash';



export default class Character{
  constructor(state){
    this.type = 'characterManager';
    this.state = state;
    // this.addChar({name: 'billy'});
  }
  addChar(char){
    if(!char.id)
      char.id = uniqid();
    defaults(char, {
      x:0,
      y:0
    });
    this.state[char.id] = char;
  }

  update(time){
    keys(this.state).forEach((key) => {
      let char = this.state[key];
      char.x += Math.random()-.5;
      char.y += Math.random()-.5;
    });
  }

}
