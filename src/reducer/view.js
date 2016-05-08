// view:
//   # _scale:
//   # 	max: 2
//   # 	min: 0.5
//   # 	step: 0.125
//   scale: 1
//   offset:
//     x: 0
//     y: 0
export default function view(state = {}, action){
  let out = {};
  if(action.type === 'VIEW_SCALE'){
    out.scale = action.scale;
  }else{
    out.scale = state.scale || 1;
  }

  if(action.type === 'VIEW_MOVE'){
    out.offset = {
      x: state.offset.x + action.x,
      y: state.offset.y + action.y
    }
  }else if(action.type === 'VIEW_SET_OFFSET'){
    out.offset = {x:action.x, y:action.y};
  }else{
    out.offset = state.offset || {x:0,y:0}
  }

  return out;
}
