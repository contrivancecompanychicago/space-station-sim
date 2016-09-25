//"Global"

import keys from 'lodash.keys';

const state = {};
export default state;
export function clear(){
  // console.log(state);
  keys(state).forEach((key) => {
    delete state[key];
  });
}

export function base(){
  return {
    Grid:{},
    Task:{},
    UI:{},
    View:{offset:{x:0,y:0}, scale:1},
    Character:{},
    "Object":{}
  };
}
