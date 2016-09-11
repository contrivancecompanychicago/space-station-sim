/*
eases use of the points system
points stored in ingame coordinates
*/
import config from 'Game/config';


const dev = true;

export default class Point{
  constructor(){
    // console.log(arguments);
    if(arguments.length === 1){
      //object mode
      if(dev){
        if(!arguments[0].x){
          throw new Error('x not defined')
        }
        if(!arguments[0].y){
          throw new Error('y not defined')
        }
      }
      this.x = arguments[0].x
      this.y = arguments[0].y
    }else if(arguments.length === 2){
      if(dev){
        if(typeof arguments[0] !== 'number'){
          throw new Error('not a number');
        }
        if(typeof arguments[1] !== 'number'){
          throw new Error('not a number');
        }
      }
      this.x = arguments[0];
      this.y = arguments[1];
    }else{
      if(dev){
        throw new Error('too many args');
      }
    }
  }

  get block(){
    return {
      x: Math.floor(this.x / config.grid.width),
      y: Math.floor(this.y / config.grid.height),
      get center(){
        return {
          x: (this.x+.5) * config.grid.width,
          y: (this.y+.5) * config.grid.height
        }
      }
    };
  }

  static fromScreen(x,y){
    //damn bitch
    return new Point(x, y)
  }
}
