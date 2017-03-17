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
import TalentPanel from './UI/Panel/Talent';
import SavePanel from './UI/Panel/Save';

import Panel from './UI/Panel';
import SelectedPanel from './UI/Panel/Selected'

import ContextMenu from './UI/ContextMenu'

import StaffPanel from './UI/Panel/Staff';

import Tutorial from './UI/Tutorial'

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
      case 'PANEL':
        active = <Panel />
        break;
    }

    let panels = []
    if(this.props.panel.log.show) panels.push(<LogPanel key='Log' />)
    if(this.props.panel.orders.show) panels.push(<OrderPanel key='Order' />)
    if(this.props.panel.staff.show) panels.push(<StaffPanel key='Staff' />)
    if(this.props.panel.hiring.show) panels.push(<HiringPanel key='Hiring' />)
    if(this.props.panel.talent.show) panels.push(<TalentPanel key='Talent' />)
    if(this.props.panel.save.show) panels.push(<SavePanel key='Save' />)

    if(this.props.contextMenu.show) panels.push(<ContextMenu key='ctx' 
    character={this.props.contextMenu.character} 
    object={this.props.contextMenu.object}
    position={this.props.contextMenu.position}
     />)

    this.props.selected.forEach((s, i) => {
      panels.push(<SelectedPanel key={s.toString()} target={s} />)
    })

    let cssHax = ''
    this.props.highlight.forEach((h) => {
      cssHax += '.'+h+'{background-color:green !important}'
    })


    // <Speed />
    return <div className="ui">
      <style>{cssHax}</style>
      <div className="panels">
        {panels}
        <Tutorial />
      </div>

      <div className="menu">
        <TimePanel />
        <Mode />
        {active}
      </div>
    </div>;
  }
}

function mapStateToProps(state:Object, props:Object):{} {
  return {
    mode: state.mode,
    panel: state.panel,
    contextMenu: state.contextMenu,
    selected: state.selected,
    highlight: state.highlight,
  };
}

function mapDispatchToProps(dispatch:Function, props:Object): {click:(id:string) => void} {
  return {
    click: (id) => {
      dispatch({type:'CHANGE_MODE'});
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UI);
