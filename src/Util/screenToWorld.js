// @flow
//global space is window coordinates
//local space is ingame coordinates before scale and offset

export default function globalToLocal(point:Object, state:Object): Object{
  return {
    x: (point.x / state.View.scale) - state.View.offset.x,
    y: (point.y / state.View.scale) - state.View.offset.y
  };
}
