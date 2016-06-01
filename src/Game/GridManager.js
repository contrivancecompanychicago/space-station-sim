export default class GridManager{
  constructor(state){
    this.state = state;
  }

  //private
  makeKey(x, y){
    return `${x}_${y}`;
  }
  parseKey(key){
    let parts = key.split('_');
    return {x:parseInt(parts[0]), y:parseInt(parts[1])};
  }

  addNode(x, y, node){

  }
}
