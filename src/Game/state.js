// @flow
//"Global"



import keys from 'lodash.keys';
import Point from 'Game/Point';


type View = {
  offset: Point,
  mousePosition: Point,
  scale: number
}

type State = {
  Grid: Object,
  Task: Object,
  UI: Object,
  View: View,
  Character: Object,
  "Object": Object
}

const state:State = base();
export default state;
export function clear(){
  // console.log(state);
  keys(state).forEach((key) => {
    delete state[key];
  });
}

export function base():State{
  return {
    Grid:{},
    Task:{},
    UI:{},
    View:{offset:new Point(0,0), mousePosition:new Point(0,0), scale:1},
    Character:{},
    "Object":{}
  };
}
