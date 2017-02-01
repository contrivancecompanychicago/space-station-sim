//@flow

type State = {
  hiring:{show:boolean},
  staff:{show:boolean},
  orders:{show:boolean},
  log:{show:boolean},
}

const defaults:State = {
  hiring:{show:true},
  staff:{show:true},
  orders:{show:true},
  log:{show:true},
}

export type PanelAction = 'TOGGLE_HIRING_PANEL'
  |'TOGGLE_STAFF_PANEL'
  |'TOGGLE_ORDERS_PANEL'
  |'TOGGLE_LOG_PANEL'

export default function panel(state:State, action:{type:string}):State{
  if(!state) state = defaults;
  switch(action.type){
    case 'TOGGLE_HIRING_PANEL':
      state.hiring.show = !state.hiring.show
    break;
    case 'TOGGLE_STAFF_PANEL':
      state.staff.show = !state.staff.show
    break;
    case 'TOGGLE_ORDERS_PANEL':
      state.orders.show = !state.orders.show
    break;
    case 'TOGGLE_LOG_PANEL':
      state.log.show = !state.log.show
    break;
  }
  return {
    hiring: state.hiring,
    staff: state.staff,
    orders: state.orders,
    log: state.log,
  }
}
