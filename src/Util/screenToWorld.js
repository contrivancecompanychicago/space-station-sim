// @flow
//global space is window coordinates
//local space is ingame coordinates before scale and offset

export default function globalToLocal(point:Object, state:Object): Object{
  return {
    x: (point.x / state.view.state.scale) - state.view.state.offset.x,
    y: (point.y / state.view.state.scale) - state.view.state.offset.y
  };
}
