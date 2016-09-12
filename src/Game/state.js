//"Global"

import keys from 'lodash.keys'

const state = {}
export default state
export function clear(){
  // console.log(state);
  keys(state).forEach((key) => {
    delete state[key]
  })
}
