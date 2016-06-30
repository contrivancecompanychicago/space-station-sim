
//global space is window coordinates
//local space is ingame coordinates before scale and offset

export default function globalToLocal(point, state){
  console.log("depreciate for screenToWorld");
  let e = new Error();
  console.log(e.stack);
  return {
    x: (point.x / state.View.scale) - state.View.offset.x,
    y: (point.y / state.View.scale) - state.View.offset.y
  };
}
