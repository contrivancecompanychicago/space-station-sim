// @flow
import React from 'react';
import { connect } from 'react-redux';

import Mode from './UI/Mode';
import Grid from './UI/Grid';
import Item from './UI/Item';
import Character from './UI/Character';
import Task from './UI/Task';
import Speed from './UI/Speed';
import Objekt from './UI/Object';

import OrderPanel from './UI/Panel/Order';
import TimePanel from './UI/Panel/Time';
import LogPanel from './UI/Panel/Log';
import HiringPanel from './UI/Panel/Hiring';

import SelectedPanel from './UI/Panel/Selected'

import StaffPanel from './UI/Panel/Staff';

import state from 'Game/state';

class UI extends React.Component {
  render() {
    //  <Task />
    let active = ""
    switch(this.props.mode){
      case 'CHAR':
        active = <Character />
        break;
      case 'GRID':
        active = <Grid />
        break;
      case 'ITEM':
        active = <Item />
        break;
      case 'OBJECT':
        active = <Objekt />
        break;
    }

    let panels = []
    if(this.props.panel.log.show) panels.push(<LogPanel />)
    if(this.props.panel.orders.show) panels.push(<OrderPanel />)
    if(this.props.panel.staff.show) panels.push(<StaffPanel />)
    if(this.props.panel.hiring.show) panels.push(<HiringPanel />)


    if(state.View.selected){
      // console.log(state.View.selected)
      panels.push(<SelectedPanel target={state.View.selected} />)
    }


    // <Speed />
    return <div className="ui">
      <div className="panels">
        {panels}
      </div>

      <div className="menu">
        <TimePanel />
        <Mode />
        {active}
      </div>
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    mode: state.mode,
    panel: state.panel
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_MODE'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UI);
