/*
eases use of the points system
points stored in ingame coordinates
*/

const dev = true;

export default class Point{
  constructor(){
    // console.log(arguments);
    if(arguments.length === 1){
      //object mode
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
}
