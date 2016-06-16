
//global space is window coordinates
//local space is ingame coordinates before scale and offset

export default function localToGlobal(point, state){
  return {
    x: (state.View.offset.x + (point.x)) * state.View.scale,
    y: (state.View.offset.y + (point.y)) * state.View.scale,
  };
}
