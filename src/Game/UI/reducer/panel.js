//@flow

type State = {
  hiring:{show:boolean},
  staff:{show:boolean},
  orders:{show:boolean},
  log:{show:boolean},
  talent:{show:boolean},
  save:{show:boolean},
}

const defaults:State = {
  hiring:{show:false},
  staff:{show:false},
  orders:{show:false},
  log:{show:false},
  talent:{show:false},
  save:{show:false},
}

export type PanelAction = 'TOGGLE_HIRING_PANEL'
  |'TOGGLE_STAFF_PANEL'
  |'TOGGLE_ORDERS_PANEL'
  |'TOGGLE_LOG_PANEL'
  |'TOGGLE_TALENT_PANEL'
  |'TOGGLE_SAVE_PANEL'

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
    case 'TOGGLE_TALENT_PANEL':
      state.talent.show = !state.talent.show
    break;
    case 'TOGGLE_SAVE_PANEL':
      state.save.show = !state.save.show
    break;
  }
  return {
    hiring: state.hiring,
    staff: state.staff,
    orders: state.orders,
    log: state.log,
    talent: state.talent,
    save: state.save,
  }
}
