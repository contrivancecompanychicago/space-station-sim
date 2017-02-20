// @flow
//global space is window coordinates
//local space is ingame coordinates before scale and offset

export default function localToGlobal(point:Object, state:Object):Object{
  return {
    x: (state.view.state.offset.x + (point.x)) * state.view.state.scale,
    y: (state.view.state.offset.y + (point.y)) * state.view.state.scale,
  };
}
