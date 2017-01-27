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

    // <Speed />
    return <div className="ui">
      <Mode />
      {active}
      <OrderPanel />
      <TimePanel />
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    mode: state.mode
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
