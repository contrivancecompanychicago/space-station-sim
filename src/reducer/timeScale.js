//timeScale: 1

export default function timeScale(state = 1, action){
  if(action.type === 'TIMESCALE') state = action.scale;
  return state;
}
