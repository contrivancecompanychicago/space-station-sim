import { keys } from 'lodash';
import { Graph, astar } from 'javascript-astar';

export default class GridManager{
  constructor(state = {}){
    this.type = 'gridManager';
    this.state = state;
  }

  userAction(selection){
    // console.log("user wooo", selection);
    let sel = selection.rect.blockRect();
    for(let y = sel.t; y <= sel.b; y++){
      for(let x = sel.l; x <= sel.r; x++){
        // console.log(y)
        // console.log(selection);
        switch(selection.button){
          case 0:
            this.addNode(x, y, 'basic');
            break;
          case 2://MouseButtons.RIGHT:
            this.removeNode(x, y);
            break;
        }
      }
    }
  }

  //TODO: move to Util
  makeKey(x, y){
    return `${x}_${y}`;
  }
  parseKey(key){
    let parts = key.split('_');
    return {x:parseInt(parts[0]), y:parseInt(parts[1])};
  }

  addNode(x, y, node){
    this.state[this.makeKey(x, y)] = node;
  }

  removeNode(x, y){
    delete this.state[this.makeKey(x, y)];
  }

  getNode(x, y){
    return this.state[this.makeKey(x, y)];
  }

  getMin(){
    let min = {x: Infinity, y: Infinity};
    keys(this.state).forEach((key) => {
      let val = this.parseKey(key);
      min = {x:Math.min(val.x, min.x), y:Math.min(val.y, min.y)};
    });
    return min;
  }

  getPath(start, end){

    //determine graph size
    let minx = Infinity;
    let miny = Infinity;
    let maxx = -Infinity;
    let maxy = -Infinity;
    keys(this.state).forEach((key) => {
      let loc = this.parseKey(key);
      minx = Math.min(minx, loc.x);
      miny = Math.min(miny, loc.y);
      maxx = Math.max(maxx, loc.x);
      maxy = Math.max(maxy, loc.y);
    });

    //make the empty Graph
    let arr = [];
    for(let x = minx; x<=maxx; x++){
      let arr2 = [];
      for(let y = miny; y<=maxy; y++){
        arr2.push(0);
      }
      arr.push(arr2);
    }

    //populate graph
    keys(this.state).forEach((key) => { //duplicate?
      let loc = this.parseKey(key);
      arr[loc.x-minx][loc.y-miny] = 1;
    });

    let graph = new Graph(arr);

    //TODO: snip above and cache
    // just need graph, min x and min y

    if(start.x===end.x&&start.y===end.y) return [end];

    start = graph.grid[start.x-minx][start.y-miny];
    end = graph.grid[end.x-minx][end.y-miny];
    let result = astar.search(graph, start, end);

    return result.map((res) => {
      return {
        x: res.x+minx,
        y: res.y+miny,
      };
    });


  }
}
